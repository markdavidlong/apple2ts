import { matchMemory } from "./memory"
import { setGamepad0, setGamepad1,
  setGamepad2,
  setGamepad3,
  setLeftButtonDown, setPushButton2, setRightButtonDown } from "./joystick"
import { passHelptext } from "./worker2main";
import { aztec } from "./games/aztec";
import { karateka } from "./games/karateka";

const gameLibrary = new Array<GameLibraryItem>()

gameLibrary.push(aztec)
gameLibrary.push(karateka)

const defaultButtons: GamePadMapping = (button: number,
  dualJoysticks: boolean, isJoystick2: boolean) => {
  if (isJoystick2) {
    switch (button) {
      case 0: setPushButton2(); break  // button #0 becomes push button 2
      case 1: break  // ignore button #1
      case 12: setGamepad3(-1); break   // D-pad U
      case 13: setGamepad3(1); break    // D-pad D
      case 14: setGamepad2(-1); break   // D-pad L
      case 15: setGamepad2(1); break    // D-pad R
      default: break;
    }
  } else {
    switch (button) {
      case 0: setLeftButtonDown(); break
      case 1: if (!dualJoysticks) setRightButtonDown(); break
      case 12: setGamepad1(-1); break   // D-pad U
      case 13: setGamepad1(1); break    // D-pad D
      case 14: setGamepad0(-1); break   // D-pad L
      case 15: setGamepad0(1); break    // D-pad R
      default: break;
    }
  }
}

// const wolf = [
//   () => {setLeftButtonDown()},
//   () => {setRightButtonDown()},
//   () => {addToBufferDebounce('U'.charCodeAt(0))},
//   () => {addToBufferDebounce('T'.charCodeAt(0))},
//   () => {setLeftButtonDown()},
//   () => {setRightButtonDown()},
//   () => {addToBufferDebounce(' '.charCodeAt(0))},
//   () => {addToBufferDebounce('\r', timeout)},
//   () => {setLeftButtonDown()},
//   () => {setRightButtonDown()},
//   () => {setLeftButtonDown()},
//   () => {setRightButtonDown()},
//   () => {paddle1timeout = 0},
//   () => {paddle1timeout = maxTimeoutCycles},
//   () => {paddle0timeout = 0},
//   () => {paddle0timeout = maxTimeoutCycles},
// ]


export const keyMapping = (key: string) => {
  for (let game of gameLibrary) {
    if (matchMemory(game.address, game.data)) {
      return (key in game.keymap) ? game.keymap[key] : key
    }   
  }
  return key
}

export const gamepadMapping = () => {
  for (let game of gameLibrary) {
    if (matchMemory(game.address, game.data)) {
      return (game.gamepad.length > 0) ? game.gamepad : defaultButtons
    }   
  }
  return defaultButtons
}

export const handleRumbleMapping = () => {
  for (let game of gameLibrary) {
    if (matchMemory(game.address, game.data)) {
      game.rumble()
      return
    }   
  }
}

export const handleHelptext = (reset = false) => {
  for (let game of gameLibrary) {
    if (matchMemory(game.address, game.data)) {
      passHelptext(game.helptext ? game.helptext : ' ')
      return
    }   
  }
  if (reset) passHelptext(' ')
}
