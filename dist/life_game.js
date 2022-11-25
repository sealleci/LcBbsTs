"use strict";
const page = {
    max_width: 56,
    max_height: 20
};
const board_len = 17;
const right_box_width = 14;
let x_axis = '';
const colors = {
    box: 6,
    axis: 9,
    label: 9,
    text: 17,
    cell: 17
};
const cell_pos = {
    x: '',
    y: '',
    setX: function (sign) {
        this.x = sign.toUpperCase();
    },
    setY: function (sign) {
        if (this.y.length < 2) {
            this.y += sign;
        }
        else {
            this.y = this.y.slice(-1) + sign;
        }
    },
    getPos: function () {
        return this.x + this.y;
    }
};
let tick = 0;
const grow_interval = 8;
const life_game = {
    cells: [],
    status: 'Initialize',
    round: 0,
    grow: function () {
        const next = [];
        const dirs = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0]
        ];
        for (let i = 0; i < board_len * board_len; i += 1) {
            next.push(this.cells[i]);
            const x = i % board_len;
            const y = Math.floor(i / board_len);
            let neighbors = 0;
            for (let j = 0; j < dirs.length; j += 1) {
                const n_x = x + dirs[j][0];
                const n_y = y + dirs[j][1];
                if (n_x >= 0 && n_x < board_len && n_y >= 0 && n_y < board_len) {
                    neighbors += this.cells[n_y * board_len + n_x];
                }
            }
            if (this.cells[i] === 0 && neighbors === 3) {
                next[i] = 1;
            }
            if (this.cells[i] === 1 && (neighbors > 3 || neighbors < 2)) {
                next[i] = 0;
            }
        }
        this.cells = next;
        this.round += 1;
    }
};
function getName() {
    return 'Life Game';
}
function reset() {
    life_game.status = 'Initialize';
    life_game.round = 0;
    life_game.cells = [];
    for (let i = 0; i < board_len * board_len; i += 1) {
        life_game.cells.push(0);
    }
    cell_pos.x = '';
    cell_pos.y = '';
    tick = 0;
}
function onConnect() {
    x_axis = '';
    for (let i = 0; i < board_len; i += 1) {
        x_axis += ' ' + String.fromCharCode('A'.charCodeAt(0) + i);
    }
    reset();
}
function onUpdate() {
    clearScreen();
    if (life_game.status === 'Running' && tick % grow_interval === 0) {
        life_game.grow();
    }
    drawBox(colors.box, 2, 1, board_len * 2 + 2, board_len + 2);
    drawText(x_axis, colors.axis, 3, 0);
    for (let i = 0; i < board_len; i += 1) {
        drawText((i + 1 < 10 ? ' ' : '') + (i + 1).toString(), colors.axis, 0, i + 2);
    }
    for (let i = 0; i < board_len * board_len; i += 1) {
        if (life_game.cells[i] === 1) {
            drawText('██', colors.cell, (i % board_len) * 2 + 3, Math.floor(i / board_len) + 2);
        }
    }
    drawBox(colors.box, board_len * 2 + 6, 1, right_box_width, 3);
    drawText('Set', colors.label, board_len * 2 + 7, 1);
    drawText('Cell', colors.label, board_len * 2 + 11, 1);
    drawText(cell_pos.getPos(), colors.text, board_len * 2 + 7, 2);
    drawBox(colors.box, board_len * 2 + 6, 5, right_box_width, 3);
    drawText('Round', colors.label, board_len * 2 + 7, 5);
    drawText(life_game.round.toString(), colors.text, board_len * 2 + 7, 6);
    drawBox(colors.box, board_len * 2 + 6, 9, right_box_width, 3);
    drawText('Status', colors.label, board_len * 2 + 7, 9);
    drawText(life_game.status, colors.text, board_len * 2 + 7, 10);
    drawBox(colors.box, board_len * 2 + 6, 13, right_box_width, 7);
    drawText('Controls', colors.label, board_len * 2 + 7, 13);
    drawText('[Z] Set or', colors.text, board_len * 2 + 7, 14);
    drawText('unset cell.', colors.text, board_len * 2 + 7, 15);
    drawText('[X] Start or', colors.text, board_len * 2 + 7, 16);
    drawText('restart.', colors.text, board_len * 2 + 7, 17);
    drawText('[S] Pause.', colors.text, board_len * 2 + 7, 18);
    if (life_game.status === 'Running') {
        tick = (tick + 1) % grow_interval;
    }
}
function onInput(key) {
    if (life_game.status === 'Initialize') {
        if (key >= '0'.charCodeAt(0) && key <= '9'.charCodeAt(0)) {
            cell_pos.setY(String.fromCharCode(key));
        }
        if (key >= 'A'.charCodeAt(0) && key <= 'A'.charCodeAt(0) + board_len - 1 ||
            key >= 'a'.charCodeAt(0) && key <= 'a'.charCodeAt(0) + board_len - 1) {
            cell_pos.setX(String.fromCharCode(key));
        }
        if (key === 'Z'.charCodeAt(0) || key === 'z'.charCodeAt(0)) {
            if (cell_pos.x !== '' && cell_pos.y !== '') {
                const x = cell_pos.x.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
                const y = parseInt(cell_pos.y);
                if (x >= 1 && x <= board_len && y >= 1 && y <= board_len) {
                    life_game.cells[(y - 1) * board_len + x - 1] ^= 1;
                    cell_pos.x = '';
                    cell_pos.y = '';
                }
            }
        }
        if (key === 'X'.charCodeAt(0) || key === 'x'.charCodeAt(0)) {
            cell_pos.x = '';
            cell_pos.y = '';
            life_game.status = 'Running';
        }
    }
    else {
        if (key === 'S'.charCodeAt(0) || key === 's'.charCodeAt(0)) {
            if (life_game.status === 'Pause') {
                life_game.status = 'Running';
            }
            else if (life_game.status === 'Running') {
                life_game.status = 'Pause';
            }
        }
        if (key === 'X'.charCodeAt(0) || key === 'x'.charCodeAt(0)) {
            reset();
        }
    }
}
