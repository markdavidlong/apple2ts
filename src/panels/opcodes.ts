import { ADDR_MODE } from "../emulator/utility/utility"

interface OpCode {
  name: string
  mode: ADDR_MODE
  bytes: number
}

export const opCodes = new Array<OpCode>(256)
export const opTable: { [key: string]: number[] } = {}

const PCODE = (name: string, mode: ADDR_MODE, pcode: number, bytes: number) => {
  console.assert(!opCodes[pcode], "Duplicate instruction: " + name + " mode=" + mode)
  opCodes[pcode] = {name, mode, bytes}
  if (!opTable[name]) opTable[name] = []
  opTable[name][mode] = pcode
}

PCODE('ADC', ADDR_MODE.IMM, 0x69, 2)
PCODE('ADC', ADDR_MODE.ZP_REL, 0x65, 2)
PCODE('ADC', ADDR_MODE.ZP_X, 0x75, 2)
PCODE('ADC', ADDR_MODE.ABS, 0x6D, 3)
PCODE('ADC', ADDR_MODE.ABS_X, 0x7D, 3)
PCODE('ADC', ADDR_MODE.ABS_Y, 0x79, 3)
PCODE('ADC', ADDR_MODE.IND_X, 0x61, 2)
PCODE('ADC', ADDR_MODE.IND_Y, 0x71, 2)
PCODE('ADC', ADDR_MODE.IND, 0x72, 2)
PCODE('AND', ADDR_MODE.IMM, 0x29, 2)
PCODE('AND', ADDR_MODE.ZP_REL, 0x25, 2)
PCODE('AND', ADDR_MODE.ZP_X, 0x35, 2)
PCODE('AND', ADDR_MODE.ABS, 0x2D, 3)
PCODE('AND', ADDR_MODE.ABS_X, 0x3D, 3)
PCODE('AND', ADDR_MODE.ABS_Y, 0x39, 3)
PCODE('AND', ADDR_MODE.IND_X, 0x21, 2)
PCODE('AND', ADDR_MODE.IND_Y, 0x31, 2)
PCODE('AND', ADDR_MODE.IND, 0x32, 2)
PCODE('ASL', ADDR_MODE.IMPLIED, 0x0A, 1)
PCODE('ASL', ADDR_MODE.ZP_REL, 0x06, 2)
PCODE('ASL', ADDR_MODE.ZP_X, 0x16, 2)
PCODE('ASL', ADDR_MODE.ABS, 0x0E, 3)
PCODE('ASL', ADDR_MODE.ABS_X, 0x1E, 3)
PCODE('BCC', ADDR_MODE.ZP_REL, 0x90, 2)
PCODE('BCS', ADDR_MODE.ZP_REL, 0xB0, 2)
PCODE('BEQ', ADDR_MODE.ZP_REL, 0xF0, 2)
PCODE('BMI', ADDR_MODE.ZP_REL, 0x30, 2)
PCODE('BNE', ADDR_MODE.ZP_REL, 0xD0, 2)
PCODE('BPL', ADDR_MODE.ZP_REL, 0x10, 2)
PCODE('BVC', ADDR_MODE.ZP_REL, 0x50, 2)
PCODE('BVS', ADDR_MODE.ZP_REL, 0x70, 2)
PCODE('BRA', ADDR_MODE.ZP_REL, 0x80, 2)
PCODE('BIT', ADDR_MODE.ZP_REL, 0x24, 2)
PCODE('BIT', ADDR_MODE.ABS, 0x2C, 3)
PCODE('BIT', ADDR_MODE.IMM, 0x89, 2)
PCODE('BIT', ADDR_MODE.ZP_X, 0x34, 2)
PCODE('BIT', ADDR_MODE.ABS_X, 0x3C, 3)
PCODE('BRK', ADDR_MODE.IMPLIED, 0x00, 1)
PCODE('CLC', ADDR_MODE.IMPLIED, 0x18, 1)
PCODE('CLD', ADDR_MODE.IMPLIED, 0xD8, 1)
PCODE('CLI', ADDR_MODE.IMPLIED, 0x58, 1)
PCODE('CLV', ADDR_MODE.IMPLIED, 0xB8, 1)
PCODE('CMP', ADDR_MODE.IMM, 0xC9, 2)
PCODE('CMP', ADDR_MODE.ZP_REL, 0xC5, 2)
PCODE('CMP', ADDR_MODE.ZP_X, 0xD5, 2)
PCODE('CMP', ADDR_MODE.ABS, 0xCD, 3)
PCODE('CMP', ADDR_MODE.ABS_X, 0xDD, 3)
PCODE('CMP', ADDR_MODE.ABS_Y, 0xD9, 3)
PCODE('CMP', ADDR_MODE.IND_X, 0xC1, 2)
PCODE('CMP', ADDR_MODE.IND_Y, 0xD1, 2)
PCODE('CMP', ADDR_MODE.IND, 0xD2, 2)
PCODE('CPX', ADDR_MODE.IMM, 0xE0, 2)
PCODE('CPX', ADDR_MODE.ZP_REL, 0xE4, 2)
PCODE('CPX', ADDR_MODE.ABS, 0xEC, 3)
PCODE('CPY', ADDR_MODE.IMM, 0xC0, 2)
PCODE('CPY', ADDR_MODE.ZP_REL, 0xC4, 2)
PCODE('CPY', ADDR_MODE.ABS, 0xCC, 3)
PCODE('DEC', ADDR_MODE.IMPLIED, 0x3A, 1)
PCODE('DEC', ADDR_MODE.ZP_REL, 0xC6, 2)
PCODE('DEC', ADDR_MODE.ZP_X, 0xD6, 2)
PCODE('DEC', ADDR_MODE.ABS, 0xCE, 3)
PCODE('DEC', ADDR_MODE.ABS_X, 0xDE, 3)
PCODE('DEX', ADDR_MODE.IMPLIED, 0xCA, 1)
PCODE('DEY', ADDR_MODE.IMPLIED, 0x88, 1)
PCODE('EOR', ADDR_MODE.IMM, 0x49, 2)
PCODE('EOR', ADDR_MODE.ZP_REL, 0x45, 2)
PCODE('EOR', ADDR_MODE.ZP_X, 0x55, 2)
PCODE('EOR', ADDR_MODE.ABS, 0x4D, 3)
PCODE('EOR', ADDR_MODE.ABS_X, 0x5D, 3)
PCODE('EOR', ADDR_MODE.ABS_Y, 0x59, 3)
PCODE('EOR', ADDR_MODE.IND_X, 0x41, 2)
PCODE('EOR', ADDR_MODE.IND_Y, 0x51, 2)
PCODE('EOR', ADDR_MODE.IND, 0x52, 2)
PCODE('INC', ADDR_MODE.IMPLIED, 0x1A, 1)
PCODE('INC', ADDR_MODE.ZP_REL, 0xE6, 2)
PCODE('INC', ADDR_MODE.ZP_X, 0xF6, 2)
PCODE('INC', ADDR_MODE.ABS, 0xEE, 3)
PCODE('INC', ADDR_MODE.ABS_X, 0xFE, 3)
PCODE('INX', ADDR_MODE.IMPLIED, 0xE8, 1)
PCODE('INY', ADDR_MODE.IMPLIED, 0xC8, 1)
PCODE('JMP', ADDR_MODE.ABS, 0x4C, 3)
PCODE('JMP', ADDR_MODE.IND, 0x6C, 3)
PCODE('JMP', ADDR_MODE.IND_X, 0x7C, 3)
PCODE('JSR', ADDR_MODE.ABS, 0x20, 3)
PCODE('LDA', ADDR_MODE.IMM, 0xA9, 2)
PCODE('LDA', ADDR_MODE.ZP_REL, 0xA5, 2)
PCODE('LDA', ADDR_MODE.ZP_X, 0xB5, 2)
PCODE('LDA', ADDR_MODE.ABS, 0xAD, 3)
PCODE('LDA', ADDR_MODE.ABS_X, 0xBD, 3)
PCODE('LDA', ADDR_MODE.ABS_Y, 0xB9, 3)
PCODE('LDA', ADDR_MODE.IND_X, 0xA1, 2)
PCODE('LDA', ADDR_MODE.IND_Y, 0xB1, 2)
PCODE('LDA', ADDR_MODE.IND, 0xB2, 2)
PCODE('LDX', ADDR_MODE.IMM, 0xA2, 2)
PCODE('LDX', ADDR_MODE.ZP_REL, 0xA6, 2)
PCODE('LDX', ADDR_MODE.ZP_Y, 0xB6, 2)
PCODE('LDX', ADDR_MODE.ABS, 0xAE, 3)
PCODE('LDX', ADDR_MODE.ABS_Y, 0xBE, 3)
PCODE('LDY', ADDR_MODE.IMM, 0xA0, 2)
PCODE('LDY', ADDR_MODE.ZP_REL, 0xA4, 2)
PCODE('LDY', ADDR_MODE.ZP_X, 0xB4, 2)
PCODE('LDY', ADDR_MODE.ABS, 0xAC, 3)
PCODE('LDY', ADDR_MODE.ABS_X, 0xBC, 3)
PCODE('LSR', ADDR_MODE.IMPLIED, 0x4A, 1)
PCODE('LSR', ADDR_MODE.ZP_REL, 0x46, 2)
PCODE('LSR', ADDR_MODE.ZP_X, 0x56, 2)
PCODE('LSR', ADDR_MODE.ABS, 0x4E, 3)
PCODE('LSR', ADDR_MODE.ABS_X, 0x5E, 3)
PCODE('NOP', ADDR_MODE.IMPLIED, 0xEA, 1)
PCODE('ORA', ADDR_MODE.IMM, 0x09, 2)
PCODE('ORA', ADDR_MODE.ZP_REL, 0x05, 2)
PCODE('ORA', ADDR_MODE.ZP_X, 0x15, 2)
PCODE('ORA', ADDR_MODE.ABS, 0x0D, 3)
PCODE('ORA', ADDR_MODE.ABS_X, 0x1D, 3)
PCODE('ORA', ADDR_MODE.ABS_Y, 0x19, 3)
PCODE('ORA', ADDR_MODE.IND_X, 0x01, 2)
PCODE('ORA', ADDR_MODE.IND_Y, 0x11, 2)
PCODE('ORA', ADDR_MODE.IND, 0x12, 2)
PCODE('PHA', ADDR_MODE.IMPLIED, 0x48, 1)
PCODE('PHP', ADDR_MODE.IMPLIED, 0x08, 1)
PCODE('PHX', ADDR_MODE.IMPLIED, 0xDA, 1)
PCODE('PHY', ADDR_MODE.IMPLIED, 0x5A, 1)
PCODE('PLA', ADDR_MODE.IMPLIED, 0x68, 1)
PCODE('PLP', ADDR_MODE.IMPLIED, 0x28, 1)
PCODE('PLX', ADDR_MODE.IMPLIED, 0xFA, 1)
PCODE('PLY', ADDR_MODE.IMPLIED, 0x7A, 1)
PCODE('ROL', ADDR_MODE.IMPLIED, 0x2A, 1)
PCODE('ROL', ADDR_MODE.ZP_REL, 0x26, 2)
PCODE('ROL', ADDR_MODE.ZP_X, 0x36, 2)
PCODE('ROL', ADDR_MODE.ABS, 0x2E, 3)
PCODE('ROL', ADDR_MODE.ABS_X, 0x3E, 3)
PCODE('ROR', ADDR_MODE.IMPLIED, 0x6A, 1)
PCODE('ROR', ADDR_MODE.ZP_REL, 0x66, 2)
PCODE('ROR', ADDR_MODE.ZP_X, 0x76, 2)
PCODE('ROR', ADDR_MODE.ABS, 0x6E, 3)
PCODE('ROR', ADDR_MODE.ABS_X, 0x7E, 3)
PCODE('RTI', ADDR_MODE.IMPLIED, 0x40, 1)
PCODE('RTS', ADDR_MODE.IMPLIED, 0x60, 1)
PCODE('SBC', ADDR_MODE.IMM, 0xE9, 2)
PCODE('SBC', ADDR_MODE.ZP_REL, 0xE5, 2)
PCODE('SBC', ADDR_MODE.ZP_X, 0xF5, 2)
PCODE('SBC', ADDR_MODE.ABS, 0xED, 3)
PCODE('SBC', ADDR_MODE.ABS_X, 0xFD, 3)
PCODE('SBC', ADDR_MODE.ABS_Y, 0xF9, 3)
PCODE('SBC', ADDR_MODE.IND_X, 0xE1, 2)
PCODE('SBC', ADDR_MODE.IND_Y, 0xF1, 2)
PCODE('SBC', ADDR_MODE.IND, 0xF2, 2)
PCODE('SEC', ADDR_MODE.IMPLIED, 0x38, 1)
PCODE('SED', ADDR_MODE.IMPLIED, 0xF8, 1)
PCODE('SEI', ADDR_MODE.IMPLIED, 0x78, 1)
PCODE('STA', ADDR_MODE.ZP_REL, 0x85, 2)
PCODE('STA', ADDR_MODE.ZP_X, 0x95, 2)
PCODE('STA', ADDR_MODE.ABS, 0x8D, 3)
PCODE('STA', ADDR_MODE.ABS_X, 0x9D, 3)
PCODE('STA', ADDR_MODE.ABS_Y, 0x99, 3)
PCODE('STA', ADDR_MODE.IND_X, 0x81, 2)
PCODE('STA', ADDR_MODE.IND_Y, 0x91, 2)
PCODE('STA', ADDR_MODE.IND, 0x92, 2)
PCODE('STX', ADDR_MODE.ZP_REL, 0x86, 2)
PCODE('STX', ADDR_MODE.ZP_Y, 0x96, 2)
PCODE('STX', ADDR_MODE.ABS, 0x8E, 3)
PCODE('STY', ADDR_MODE.ZP_REL, 0x84, 2)
PCODE('STY', ADDR_MODE.ZP_X, 0x94, 2)
PCODE('STY', ADDR_MODE.ABS, 0x8C, 3)
PCODE('STZ', ADDR_MODE.ZP_REL, 0x64, 2)
PCODE('STZ', ADDR_MODE.ZP_X, 0x74, 2)
PCODE('STZ', ADDR_MODE.ABS, 0x9C, 3)
PCODE('STZ', ADDR_MODE.ABS_X, 0x9E, 3)
PCODE('TAX', ADDR_MODE.IMPLIED, 0xAA, 1)
PCODE('TAY', ADDR_MODE.IMPLIED, 0xA8, 1)
PCODE('TSX', ADDR_MODE.IMPLIED, 0xBA, 1)
PCODE('TXA', ADDR_MODE.IMPLIED, 0x8A, 1)
PCODE('TXS', ADDR_MODE.IMPLIED, 0x9A, 1)
PCODE('TYA', ADDR_MODE.IMPLIED, 0x98, 1)
PCODE('TRB', ADDR_MODE.ZP_REL, 0x14, 2)
PCODE('TRB', ADDR_MODE.ABS, 0x1C, 3)
PCODE('TSB', ADDR_MODE.ZP_REL, 0x04, 2)
PCODE('TSB', ADDR_MODE.ABS, 0x0C, 3)

const twoByteNops = [0x02, 0x22, 0x42, 0x62, 0x82, 0xC2, 0xE2]
const nopUndoc = '???'
twoByteNops.forEach(instr => {
  PCODE(nopUndoc, ADDR_MODE.IMPLIED, instr, 2)
});
for (let i = 0; i <= 15; i++) {
  PCODE(nopUndoc, ADDR_MODE.IMPLIED, 3 + 16 * i, 1)
  PCODE(nopUndoc, ADDR_MODE.IMPLIED, 7 + 16 * i, 1)
  PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xB + 16 * i, 1)
  PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xF + 16 * i, 1)
}
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0x44, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0x54, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xD4, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xF4, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0x5C, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xDC, 2)
PCODE(nopUndoc, ADDR_MODE.IMPLIED, 0xFC, 2)
// Fill the rest of the 65c02 with BRK instructions. This avoids needing
// to do a check in processInstruction, and also breaks on a bad op code.
for (let i = 0; i < 256; i++) {
  if (!opCodes[i]) {
    console.log("ERROR: OPCODE " + i.toString(16) + " should be implemented")
  }
}
export const opCodeNames = Object.keys(opTable)
