---
date:
  created: 2024-11-29
---


# Horrible schema names in fastapi

Reusing pyndantic models with usage of [type generics](https://mypy.readthedocs.io/en/stable/generics.html) can cause horrible schema names
in the resulting openapi spec.

This will show in your openapi spec as a schema named `ResponseList_MyResponse_MyMetaResponse_`:

```python
@router.get("/myroute")
async def myroute() -> ResponseList[MyResponse, MyMetaResponse]:
    return Responselist(data=MyResponse(), meta=MyMetaResponse())

```

A quick fix can be add a definition of a model that extends your reusable base model.


```python
from pydantic import BaseModel

class ResponseList[Data, Meta](BaseModel):
    data: list[Data]
    meta: Meta
    
class MyResponse(BaseModel):    
    id: str
    
class MyMetaResponse(BaseModel):    
    copyright: str    

class MyListResponse(
    ResponseList[MyResponse, MyMetaResponse]
):
    pass


@router.get("/myroute")
async def myroute() -> MyListResponse:
    return MyListResponse(data=[MyResponse()], meta=MyMetaResponse())


```