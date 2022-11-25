type Enumerate<N extends number, L extends number[] = []> = L['length'] extends N ? L[number] : Enumerate<N, [...L, L['length']]>
/**
 * Generate a union type from the range of `[L, G)`.
 */
type IntegerRange<L extends number, G extends number> = Exclude<Enumerate<G>, Enumerate<L>>
type ColorRange = IntegerRange<0, 18>

/**
 * Clear the screen.
 */
declare function clearScreen(): void
/**
 * Draw the specified text. 
 * @param color Vary from `0` (darkest) to `17` (lightest).
 */
declare function drawText(text: string, color: ColorRange, x: number, y: number): void
/**
 * Draw the specified text, wrapping it so that it is no more than `width`.
 * @param color Vary from `0` (darkest) to `17` (lightest).
 */
declare function drawTextWrapped(text: string, color: ColorRange, x: number, y: number, width: number): void
/**
 * Draw a box using the built-in box drawing characters.
 * @param color Vary from `0` (darkest) to `17` (lightest).
 */
declare function drawBox(color: ColorRange, x: number, y: number, width: number, height: number): void
/**
 * Fill an area using the specified symbol.
 * @param color Vary from `0` (darkest) to `17` (lightest).
 */
declare function fillArea(symbol: string, color: ColorRange, x: number, y: number, width: number, height: number): void
/**
 * Write this server's persisted data string.
 * 
 * Use `JSON.stringify()` to convert a JavaScript object to a JSON string.
 */
declare function saveData(data: string): void
/**
 * Read this server's persisted data string. 
 * 
 * Use `JSON.parse()` to convert a JSON string to a JavaScript object.
 */
declare function loadData(): string

/* 
 Supported charactor set:
 ABCDEFGHIJKLMNOPQRSTUVWXYZ
 abcdefghijklmnopqrstuvwxyz
 .,:;!?&#/\%'"0123456789+-*()[]^`
 █▟▙▜▛▀▄▐▌▝▘▗▖─═║╔╗╚╝╠╣╦╩╬><▲▼☺☻⚉™♦♣♠♥
*/

const page = {
    max_width: 56,
    max_height: 20
}

/**
 * Return a string that will be used as the server's name. 
 * @return The name of the server which should be short enough to fit in the *NETronics Connect!* menu.
 */
function getName(): string {
    return ''
}

/**
 * Triggered when a user connects to the server.
 */
function onConnect() {

}

/**
 * Triggered about 30 times per second while a user is connected to the server.
 */
function onUpdate() {
    clearScreen()
}

/**
 * Triggered when the connected user presses a key.
 * @param key The value of the pressed key which is representated in ASCII.
 */
function onInput(key: number) {
    switch (key) {
        default:
            break
    }
}
