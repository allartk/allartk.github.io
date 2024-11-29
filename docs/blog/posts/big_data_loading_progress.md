---
date:
  created: 2024-11-28
---

# Loading big data fixtures: Showing progress

Recently I felt the need to show progress during a multiprocessing command loading a large set of fixtures

Here a slimmed down version without the data loading itself. 

The command is executed with the help of [typer](https://typer.tiangolo.com/)


```python
import time
from multiprocessing import Pool
from rich.progress import Progress
import random
import typer

def worker(_: int) -> None:
    time.sleep(random.randint(0, 5) / 10)

def main(processes: int = 4) -> None:
    tasks = range(100)
    with Progress() as progress:
        task_id = progress.add_task("[cyan]Completed...", total=len(tasks))
        with Pool(processes) as pool:
            results = pool.imap(
                worker,
                tasks
            )
            for _ in results:
                progress.advance(task_id)


if __name__ == "__main__":
    typer.run(main)
```

