import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JogodavelhaService {
  private readonly board_size: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private movement_number: number;
  private victory: any;

  private _player: number;
  private _showIntro: boolean;
  private _showBoard: boolean;
  private _showEnd: boolean;

  constructor() {}

  initialize(): void {
    this._showIntro = true;
    this._showBoard = false;
    this._showEnd = false;
    this.movement_number = 0;
    this._player = this.X;
    this.victory = false;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [this.board_size];
    for (let i = 0; i < this.board_size; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showIntro(): boolean {
    return this._showIntro;
  }

  get showBoard(): boolean {
    return this._showBoard;
  }

  get showEnd(): boolean {
    return this._showEnd;
  }

  get player(): number {
    return this._player;
  }

  initializeGame(): void {
    this._showIntro = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    //invalid attempt
    if (this.board[posX][posY] !== this.EMPTY || this.victory) {
      return;
    }

    this.board[posX][posY] == this.player;
    this.movement_number++;
    this.victory = this.gameOver(posX, posY, this.board, this._player);
    this._player = this._player === this.X ? this.O : this.X;

    if (!this.victory && this.movement_number < 9) {
      this.cpuPlay();
    }

    //there's a victory
    if (this.victory !== false) {
      this._showEnd = true;
    }

    //draw
    if (!this.victory && this.movement_number === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  gameOver(line: number, column: number, board: any, player: number) {
    let end: any = false;

    //validate line
    if (
      board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === [player]
    ) {
      end = [
        [line, 0],
        [line, 1],
        [line, 2],
      ];
    }

    //validate column
    if (
      board[0][column] === player &&
      board[1][column] === player &&
      board[2][column] === player
    ) {
      end = [
        [0, column],
        [1, column],
        [2, column],
      ];
    }

    //valdiate diagonals
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      end = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return end;
  }

  cpuPlay(): void {
    let play: number[] = this.getPlay(this.O);

    if (play.length <= 0) {
      play = this.getPlay(this.X);
    }

    if (play.length <= 0) {
      let plays: any = [];
      for (let i = 0; i < this.board_size; i++) {
        for (let j = 0; j < this.board_size; j++) {
          if (this.board_size[i][j] === this.EMPTY) {
            plays.push([i, j]);
          }
        }
      }
      let k = Math.floor(Math.random() * (plays.length - 1));
      play = [plays[k][0], plays[k][1]];
    }

    this.board[play[0]][play[1]] = this._player;
    this.movement_number++;
    this.victory = this.gameOver(play[0], play[1], this.board, this._player);
    this._player = this._player === this.X ? this.O : this.X;
  }

  getPlay(player: number): number[] {
    let brd = this.board;
    for (let lin = 0; lin < this.board_size; lin++) {
      for (let col = 0; col < this.board_size; col++) {
        if (brd[lin][col] !== this.EMPTY) {
          continue;
        }
        brd[lin][col] = player;
        if (this.gameOver(lin, col, brd, player)) {
          return [lin, col];
        }
        brd[lin][col] = this.EMPTY;
      }
    }

    return [];
  }

  showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  showO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  showVictory(posX: number, posY: number): boolean {
    let showVictory: boolean = false;

    if (!this.victory) {
      return showVictory;
    }

    for (let pos of this.victory) {
      if (pos[0] === posX && pos[1] === posY) {
        showVictory = true;
        break;
      }
    }

    return showVictory;
  }

  newGame(): void {
    this.initialize();
    this._showEnd = false;
    this._showIntro = false;
    this._showBoard = true;
  }
}
