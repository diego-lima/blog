---
title: "How to run python scripts in 0 steps"
description: "learn how to run scripts worry-free (forget about dependency management)"
publishDate: 2025-06-14
tags: ["python"]
draft: false
---

[uv](https://docs.astral.sh/uv/#uv) is an "*extremely fast Python package and project manager, written in Rust*".

It took off last year as an alternative for previous python package managers such as `pip`, `pip-tools`, `poetry`, and `virtualenv`.

The coolest thing about UV, apart from the fact that it's really fast and makes managing python virtually a solved problem, is that you can use it as a way to run python scripts in 0 steps!

If you had a python script, you'd need at least one pre-flight step before you could run it on a new machine:
- install all dependencies
	- (can include python itself, or libraries, or maybe even your preferred package manager itself)
- run the script

uv, however, when combined with inline script metadata ([PEP 723](https://peps.python.org/pep-0723/)) and [uv Scripts](https://docs.astral.sh/uv/#scripts) , can turn any single-file script into a fully portable executable (kind of like [pex](https://pypi.org/project/pex/) but not really). 

With a clever polyglot trick—a single file written to be valid in multiple languages (in this case, shell and Python)—we can also make `uv` self-install, so we don't even need to have it beforehand!

## Embed python and library versions on the script itself

Inline script metadata can be used to embed any and all dependencies for a script in the script itself:
```python title=my_script.py
# /// script
# requires-python = "~=3.12"
# dependencies = [
# "marimo==0.11.25",
# "numpy",
# "requests",
# ]
# ///
```
If you include the commented snippet above anywhere in your code, [PEP 723](https://peps.python.org/pep-0723/) tells us that it will be identified and parsed to identify python version 3.12 and these marimo, numpy and requests dependencies.

uv can now resolve any dependency and execute your script:

```sh title="running uv script"
uv run --script my_script.py
```

## Turning the script into an executable file
We can also use a shebang added at the top of the file to make it easier.

```python title=my_script.py shebang
#!/usr/bin/env -S uv run --script
```

now, we can just do either way to execute it:

```sh title="running uv script (easy way)"
./my_script.py  # if you did `chmod +x my_script.py`
sh my_script.py # if you didn't
```

the problem is: we're still depending on having uv pre-installed!

## install uv, python and dependencies in zero steps and run the script with a polyglot trick

`uv` itself is also really easy to install:

```sh title="installing uv (macOS and Linux)"
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```sh title="installing uv (Windows)"
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Beyond the python and library versions, we can also embed the uv installation on the script itself:

```python title="my_script.py"
#!/usr/bin/env sh

""":"
# Polyglot trick: Python sees a triple-quoted string, bash sees "" then ":" (no-op)
# Install UV if needed (zero-dependency setup) - redirect output to stderr to preserve clean stdout
which uv >/dev/null || {
    echo ">>> uv install required" >&2 \
    && curl -LsSf https://astral.sh/uv/install.sh | sh >&2 \
    && echo ">>> uv install done\n\n" >&2
}

# Execute with UV, replacing shell process (preserves stdio)
exec uv run --script --quiet "$0" "$@"
":"""
```

Key differences here:
- we turned the shebang back into bash
- we included a command on the file itself to check for uv and install if missing
- then a command to use uv to run the file with the chosen versions for python and libs

The same file is doing three things at once:
- installing uv if needed
- invoking uv
- hosting python code

## putting it all together

```python title="my_script.py"
#!/usr/bin/env sh

""":"
# Polyglot trick: Python sees a triple-quoted string, bash sees "" then ":" (no-op)
# Install UV if needed (zero-dependency setup) - redirect output to stderr to preserve clean stdout
which uv >/dev/null || {
    echo ">>> uv install required" >&2 \
    && curl -LsSf https://astral.sh/uv/install.sh | sh >&2 \
    && echo ">>> uv install done\n\n" >&2
}

# Execute with UV, replacing shell process (preserves stdio)
exec uv run --script --quiet "$0" "$@"
":"""

# /// script
# requires-python = "~=3.12"
# dependencies = [
#     "marimo==0.11.25",
#     "numpy",
#     "requests",
# ]
# ///

import marimo
import numpy as np
import requests

print(f"using marimo.{marimo.__version__}")
print(f"using numpy.{np.__version__}")
print(f"using requests: {requests.__file__}")

# Example: Fetch authenticated data
session = requests.Session()
session.cookies = requests.cookies.RequestsCookieJar()
# Add your authentication logic here
print("Script running worry-free with dependencies resolved!")
```

if you run `sh my_script.py` on ANY brand new machine, you should see:

```bash
$ sh my_script.py
using marimo.0.11.25
using numpy.2.3.0
using requests: /Users/diegolm/.cache/uv/environments-v2/py-2d879b88d0cc5794/lib/python3.12/site-packages/requests/__init__.py
Script running worry-free with dependencies resolved!
```

REGARDLESS of any pre-conditions.

## credits

I first found this tip on [Paul Willot's blog](https://paulw.tokyo/): [Standalone python script with uv](https://paulw.tokyo/standalone-python-script-with-uv/)

I then modified it so it were stdio-MCP-friendly (mostly, redirect stuff to sterr and preserve clean stdio)

*(blog post WIP)*