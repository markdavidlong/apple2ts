import { parseAssembly } from "./assembler";

const addr = 0x300

test('parseAssembly address modes', () => {
  expect(parseAssembly(addr, [" BRK"])).toEqual([0x00])
  expect(parseAssembly(addr, [" LDA #65"])).toEqual([0xA9, 0x41])
  expect(parseAssembly(addr, [" LDA #$C0"])).toEqual([0xA9, 0xC0])
  expect(parseAssembly(addr, [" LDA $C0"])).toEqual([0xA5, 0xC0])
  expect(parseAssembly(addr, [" LDA $C0,X"])).toEqual([0xB5, 0xC0])
  expect(parseAssembly(addr, [" LDX $C0,Y"])).toEqual([0xB6, 0xC0])
  expect(parseAssembly(addr, [" LDA $00C0"])).toEqual([0xAD, 0xC0, 0x00])
  expect(parseAssembly(addr, [" LDA $1234"])).toEqual([0xAD, 0x34, 0x12])
  expect(parseAssembly(addr, [" LDA $1234,X"])).toEqual([0xBD, 0x34, 0x12])
  expect(parseAssembly(addr, [" LDA $1234,Y"])).toEqual([0xB9, 0x34, 0x12])
  expect(parseAssembly(addr, [" LDA ($C0,X)"])).toEqual([0xA1, 0xC0])
  expect(parseAssembly(addr, [" LDA ($C0),Y"])).toEqual([0xB1, 0xC0])
  expect(parseAssembly(addr, [" JMP ($1234)"])).toEqual([0x6C, 0x34, 0x12])
  expect(parseAssembly(addr, [" LDA ($C0)"])).toEqual([0xB2, 0xC0])
  expect(parseAssembly(addr, [" JMP ($1234,X)"])).toEqual([0x7C, 0x34, 0x12])
})

test('parseAssembly with labels', () => {
  expect(parseAssembly(addr, ["ABC EQU $FA", " LDA ABC"])).toEqual([0xA5, 0xFA])
  expect(parseAssembly(addr, ["ABC EQU $1234", " LDA ABC"])).toEqual([0xAD, 0x34, 0x12])
})
  
test('parseAssembly with labels and math', () => {
  expect(parseAssembly(addr, ["ABC EQU $FA", " LDA ABC+10"])).toEqual([0xAD, 0x04, 0x01])
  expect(parseAssembly(addr, ["ABC EQU $FA", " LDA ABC+#10"])).toEqual([0xAD, 0x04, 0x01])
  expect(parseAssembly(addr, ["ABC EQU $1234", " LDA ABC+3"])).toEqual([0xAD, 0x37, 0x12])
  expect(parseAssembly(addr, ["ABC EQU $1234", " LDA ABC-76"])).toEqual([0xAD, 0xE8, 0x11])
})

test('parseAssembly with labels and promote/demote zp and abs', () => {
  expect(parseAssembly(addr, ["ABC EQU $FA", " LDA ABC+$10"])).toEqual([0xAD, 0x0A, 0x01])
  expect(parseAssembly(addr, ["ABC EQU $1234", " LDA ABC-$1230"])).toEqual([0xA5, 0x04])
})

test('parseAssembly with labels and wraparound', () => {
  expect(parseAssembly(addr, ["ABC EQU $FFFE", " LDA ABC+$FF"])).toEqual([0xA5, 0xFD])
  expect(parseAssembly(addr, ["ABC EQU $1234", " LDA ABC-$1236"])).toEqual([0xAD, 0xFE, 0xFF])
})

test('parseAssembly with labels immediate mode', () => {
  expect(parseAssembly(addr, ["ABC EQU $FA", " LDA #ABC"])).toEqual([0xA9, 0xFA])
})
