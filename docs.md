# PyComplete
### How to run
The model is based on [Galois autocompleter](https://github.com/galois-autocompleter/galois-autocompleter),
Run `git clone https://github.com/galois-autocompleter/galois-autocompleter` and follow the instructions from the repo to setup the model.
After completing the instruction in Galois repo, run `python main.py`, that will setup a server on `localhost:3030` with a handler `/autocomplete`.

Example of usage:
```
curl -X POST \
  http://localhost:3030/autocomplete \
  -H 'Content-Type: application/json' \
  -d '{"text":"your python source code"}'
```

After that, run `git clone https://github.com/MLSquad/PyComplete.git` and open `site_src/index.html` file in the browser. 
Congratulations, you're all set!


### A note on code editor window
The editor with syntax highlighting is supplied by `EditArea`, an open-source highly customizable editor web editor with syntax highlighting for many languages, Python included. Documentation on EditArea can be found [there](https://www.cdolivet.com/editarea/editarea/docs/).

