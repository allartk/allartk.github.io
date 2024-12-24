---
date:
    created: 2024-12-24
---

# When to patch

The [patch method](https://docs.python.org/3/library/unittest.mock.html#patch) of
the [unittest.mock](https://docs.python.org/3/library/unittest.mock.html#) library has excellent documentation how it
works.

Recently a co-worker asked me, when to use it.

Patching is something to use with [unit tests](https://martinfowler.com/bliki/UnitTest.html), or more specific:

* When you only want to test function/class/method A, and not the other functions/classes used inside A, you should patch


```python title="test_unit.py"
class TestCsvWriteFactory:
    @patch("app.download.service.generator.csv")
    def test_csv_writer_factory(self, mock_csv: MagicMock) -> None:
        """Patch the csv module, so it is not called and excluded from the test, 
        but assert it's write method is called
        """
        csv_writer_factory()
        mock_csv.writer.assert_called_once()
```

```python title="unit.py"
import csv
from typing import Any

def csv_writer_factory():
    class FileLike:
        """An object that implements just the write method of the file-like
        interface.
        """

        def write(self, value: Any) -> Any:
            """Write the value by returning it"""
            return value

    return csv.writer(FileLike(), delimiter=",", quotechar='"')

```