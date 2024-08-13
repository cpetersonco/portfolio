---
title: Using Django with Turborepo
description: A guide for using Django within the monorepo tool Turborepo.
author: cpeterson
slug: using-django-with-turborepo
pubDate: 2024-08-13
---

Perhaps you are wondering if you can combine the DRY power of a Django Web
Server with the ease of development of a monorepo tool like Turborepo. You can!
I'll show you how.

Turborepo
[explictly has multi-language support.](https://turbo.build/repo/docs/guides/multi-language)
For this explaination, I will assume you have a working Turborepo monoreposity
setup with an `apps` workspace. If you need help getting set up, follow the
[Turborepo installation guide.](https://turbo.build/repo/docs/getting-started/installation)

### Adding an app to Turborepo

Django is a long-running application, so we should create our server in the
`apps/` workspace. Add a directory with the name of your Django application. For
this example, we'll use `apps/server/`.

Inside `server`, add a `package.json` with the following contents:

```json
{
    "name": "@repo/server",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "preinstall": "python -m pip install -r requirements.txt"
        "start": "python manage.py runserver",
        "migrate": "python manage.py migrate",
        "makemigrations": "python manage.py makemigrations",
        "test": "python manage.py test",
        "lint": "flake8",
        "dev": "python manage.py runserver"
    }
}
```

Now we're ready to add our Django application!

### Setting up Django

If you don't have Django installed yet, follow the
[Django installation guide](https://www.djangoproject.com/download/). Verify
your installation by running this command to see if Django is installed.

```bash
django-admin --version
> 4.2.3
```

Now, we'll use `django-admin` to bootstrap the application.

```bash
django-admin startproject mysite
```

For a detailed guide on setting up a Django application, follow the
[official Django tutorial](https://docs.djangoproject.com/en/5.1/intro/tutorial01/).
For our purposes, the Django web server is setup.

Because Python uses its own dependancy management, I would recommend generating
a `requirements.txt` at this point. If you're using Python virtual environments,
you can use `pip freeze > requirements.txt`; otherwise, I recommend using
[pipreqs](https://github.com/bndr/pipreqs), which generate the dependencies by
analyzing the imports used within a project.

### Configuring Turborepo tasks

Our goal with using a monorepo setup is to be able to execute any command from
the root directory. For Turborepo to "know" about the scripts we've added to
`server`, we'll need to add them to our `tasks` configutation in `turbo.json`.

```json
{
    "$schema": "https://turbo.build/schema.json",
    "tasks": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": [".next/**", "!.next/cache/**"]
        },
        "check-types": {
            "dependsOn": ["^check-types"]
        },
        "dev": {
            "persistent": true,
            "cache": false
        },
        "migrate": {},
        "makemigrations": {},
        "lint": {}
    }
}
```

Try running `npm run dev` from the root directory.

## Oops, a bug

You may be running into this issue.

```bash
pyenv: python: command not found

The `python' command exists in these Python versions:
    3.10.14
```

You'll need to add a `.python-version` file to your root directory. Inside, put
the Python version you are using.

```txt
3.10.14
```

Running `npm run dev` should now work! You should now see something along the
lines of this in your console.

```bash
@repo/server:dev: cache bypass, force executing 8976b36964c53445
@repo/server:dev:
@repo/server:dev: > @repo/server@1.0.0 dev /Users/cpeterson/Documents/repos/analytics/apps/server
@repo/server:dev: > python manage.py runserver
@repo/server:dev:
@repo/server:dev: Watching for file changes with StatReloader
@repo/server:dev: Performing system checks...
@repo/server:dev:
@repo/server:dev: System check identified no issues (0 silenced).
@repo/server:dev: August 13, 2024 - 17:31:12
@repo/server:dev: Django version 4.2.3, using settings 'server.settings'
@repo/server:dev: Starting development server at http://127.0.0.1:8000/
@repo/server:dev: Quit the server with CONTROL-C.
```

This is by no means a comprehensive guide for using Django or Turborepo, but I
noticed there wasn't a tutorial out there for combining the two. Toodles!
