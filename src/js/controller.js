import _ from 'lodash'

const root = document.getElementById('root');

const renderCasilla = (turn, colorFicha, i, j, table) => {
    const casilla = document.createElement('div');
    casilla.style.backgroundColor = 'green';
    casilla.style.border = '1px solid black';
    casilla.style.height = '60px';
    casilla.style.width = '60px';
    const ficha = renderFicha(turn, colorFicha, i, j, table);
    if(ficha!=null){
        casilla.appendChild(ficha);
    };
    return casilla;
};

const renderFicha = (turn, color, i, j, table) => {
    if(color > 0){
        const ficha = color === 3 ? document.createElement('button') : document.createElement('div');
        ficha.style.backgroundColor = color===1 ? 'black' : 'white';
        ficha.style.borderRadius = '34px';
        ficha.style.height = '54px';
        ficha.style.marginLeft = '3px';
        ficha.style.marginTop = '3px';
        ficha.style.width = '54px';
        if(color === 3){
            ficha.style.opacity = 0.5;
            ficha.style.backgroundColor = 'gray';
            //funcion del boton
            ficha.onclick = () => {
                table[i][j] = turn;
                const arrayMovDisponibles = movimientosDisponibles(turn, i, j, table);
                for (let i = 0; i < arrayMovDisponibles.length; i++) {
                    table[arrayMovDisponibles[i][0]][arrayMovDisponibles[i][1]] = turn;                    
                }
                appState.table = table;
                appState.turn = turn === 1 ? 2 : 1;;
                root.innerHTML = '';
                render(root,appState);
            };
        }
        return ficha;
    }else {
        return null;
    };
};

const encontrarMovimientos = (turn, color, i, j, table) => {
    if(color === 0){
        const arrayMovimientos = movimientosDisponibles(turn, i, j, table);
        if(arrayMovimientos.length>0){
            color = 3;
        }        
    };
    return color;
};

const movimientosDisponibles = (turn, i, j, table) => {
    
    const array = (diagonalIA(turn, i, j, table, []))
    .concat(verticalA(turn, i, j, table, []))
    .concat(diagonalDA(turn, i, j, table, []))
    .concat(horizontalI(turn, i, j, table, []))
    .concat(horizontalD(turn, i, j, table, []))
    .concat(diagonalIB(turn, i, j, table, []))
    .concat(verticalB(turn, i, j, table, []))
    .concat(diagonalDB(turn, i, j, table, []))

    return array;
};

const diagonalIA = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != 0 && j != 0){
        if(table[i-1][j-1] === opositionTurn){
            array.push([i-1,j-1]);
            return diagonalIA(turn, i-1, j-1, table, array);
        }else if(table[i-1][j-1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const verticalA = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != 0){
        if(table[i-1][j] === opositionTurn){
            array.push([i-1,j]);
            return verticalA(turn, i-1, j, table, array);
        }else if(table[i-1][j] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const diagonalDA = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != 0 && j != (table.length - 1)){
        if(table[i-1][j+1] === opositionTurn){
            array.push([i-1,j+1]);
            return diagonalDA(turn, i-1, j+1, table, array);
        }else if(table[i-1][j+1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const horizontalI = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(j != 0){
        if(table[i][j-1] === opositionTurn){
            array.push([i,j-1]);
            return horizontalI(turn, i, j-1, table, array);
        }else if(table[i][j-1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const horizontalD = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(j != (table.length - 1)){
        if(table[i][j+1] === opositionTurn){
            array.push([i,j+1]);
            return horizontalD(turn, i, j+1, table, array);
        }else if(table[i][j+1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const diagonalIB = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != (table.length - 1) && j != 0){
        if(table[i+1][j-1] === opositionTurn){
            array.push([i+1,j-1]);
            return diagonalIB(turn, i+1, j-1, table, array);
        }else if(table[i+1][j-1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const verticalB = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != (table.length - 1)){
        if(table[i+1][j] === opositionTurn){
            array.push([i+1,j]);
            return verticalB(turn, i+1, j, table, array);
        }else if(table[i+1][j] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const diagonalDB = (turn, i, j, table, array) => {
    const opositionTurn = turn === 1 ? 2 : 1;
    if(i != (table.length - 1) && j != (table.length - 1)){
        if(table[i+1][j+1] === opositionTurn){
            array.push([i+1,j+1]);
            return diagonalDB(turn, i+1, j+1, table, array);
        }else if(table[i+1][j+1] === turn){
            return array;
        }else {
            return [];
        }
    }else {
        return [];
    };
};

const render = (mount,state) => {

    const { turn } = state;
    const { table } = state;

    //Se crea el tablero
    const tablero = document.createElement('div');
    tablero.style.alignItems = 'center';
    tablero.style.backgroundColor = 'black';
    tablero.style.display = 'flex';
    tablero.style.flexDirection = 'row';
    tablero.style.flexWrap = 'wrap';
    tablero.style.height = '500px';
    tablero.style.justifyContent = 'center';
    tablero.style.padding = '5px';
    tablero.style.width = '500px';

    //Se hacen los botones con los movimientos disonibles
    const renderTable = table
    .map((fila, i) => fila
    .map((casilla, j) => encontrarMovimientos(turn, casilla, i, j, table)));

    //Se renderiza el tablero
    renderTable
    .map((fila, i) => fila
    .map((casilla, j) => renderCasilla(turn, casilla, i, j, table))
    .forEach(casilla => tablero.appendChild(casilla)));

    let negros = 0;
    let blancos = 0;
    let disonibles = 0;
    const flattenTable =  _.flattenDeep(renderTable)
    for (let i = 0; i < flattenTable.length; i++) {
        negros = flattenTable[i] === 1 ? negros + 1 : negros;
        blancos = flattenTable[i] === 2 ? blancos + 1 : blancos;
        disonibles = flattenTable[i] === 3 ? disonibles + 1 : disonibles;        
    }

    //Se crea el titulo de la pagina
    const titulo = document.createElement('H2');
    titulo.textContent = 'OTHELLO';
    titulo.style.fontFamily = 'Cursive';

    //Se crea el marcador del juego
    const marcador = document.createElement('p');
    marcador.textContent = 'Negros '+ negros + ' - '+ blancos + ' Blancos';
    marcador.style.fontFamily = 'Cursive';

    //Se crea el turno del juego
    const turno = document.createElement('p');
    turno.textContent = (turn === 1) ? 'Es turno del jugador de fichas negras' : 'Es turno del jugador de fichas blancas';
    turno.style.fontFamily = 'Cursive';
    
    //Se modifica el mount
    mount.style.alignItems = 'center';
    mount.style.display = 'flex';
    mount.style.justifyContent = 'center';
    mount.style.flexDirection = 'column';

    //Se ingresan los objetos al mount
    mount.appendChild(titulo); 
    mount.appendChild(marcador); 
    mount.appendChild(turno); 
    mount.appendChild(tablero); 

    if(disonibles === 0) {
        let message = "Gano el jugador de las fichas ";
        message = (negros > blancos) ? message + 'negras' : message + 'blancas';
        message = (negros === blancos) ? 'El juego termino en un empate' : message; 
        alert(message);
    }
};

const appState = {
    table: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    turn : 1
};

render(root,appState);
