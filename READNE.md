# Last Call BBS in TypeScript

## Template

Directory architecture.

``` txt
root
├── template
│   └── axiom.ts
└── ts
    ├── server_1.ts
    :
    └── server_n.ts
```

Copy the content from `template/axiom.ts`.

## Copy

Directory architecture.

``` txt
root
└── script
    ├── config
    │   └── dest.json
    └── copy.js
```

Input the path here.

``` json
{
    "dest_dir": ""
}
```

Absolute path.

`/**/Last Call BBS/*/servers/`

## Run

``` cmd
npm start
```

It will compile `.ts` files to `.js` files.

``` txt
root
├── ts
│   ├── server_1.ts
│   :
│   └── server_n.ts
└── dist
    ├── server_1.js
    :
    └── server_n.js
```

Then it will copy `.js` files to the `servers/` directory.

## JaveScript Caution

It is the subset of JavaScript and is older than ES6.
no DOM, BOM, class, async, await, Promise, arrow function `() => {}`,
