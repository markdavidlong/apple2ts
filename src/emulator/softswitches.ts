import { memGetC000, memSetC000 } from "./memory"
import { popKey } from "./devices/keyboard"
import { passClickSpeaker } from "./worker2main"
import { resetJoystick, checkJoystickValues } from "./devices/joystick"
import { toHex } from "./utility/utility"
import { s6502 } from "./instructions"

type tSetFunc = ((addr: number, cycleCount: number) => void) | null

type SoftSwitch = {
  offAddr: number
  onAddr: number
  isSetAddr: number
  writeOnly: boolean
  isSet: boolean
  setFunc: tSetFunc
}

const sswitchArray: Array<SoftSwitch> = []

const NewSwitch = (offAddr: number, onAddr: number, isSetAddr: number,
  writeOnly = false,
  setFunc: tSetFunc = null): SoftSwitch => {
  const result: SoftSwitch = {
    offAddr: offAddr,
    onAddr: onAddr,
    isSetAddr: isSetAddr,
    writeOnly: writeOnly,
    isSet: false,
    setFunc: setFunc,
  }
  if (offAddr >= 0xC000) {
    sswitchArray[offAddr - 0xC000] = result
  }
  if (onAddr >= 0xC000) {
    sswitchArray[onAddr - 0xC000] = result
  } 
  if (isSetAddr >= 0xC000) {
    sswitchArray[isSetAddr - 0xC000] = result
  } 
  return result
}

const rand = () => Math.floor(256 * Math.random())

export const handleBankedRAM = (addr: number) => {
  // Only keep bits 0, 1, 3 of the 0xC08* number
  addr &= 0b1011
  SWITCHES.READBSR2.isSet = addr === 0
  SWITCHES.WRITEBSR2.isSet = addr === 1
  SWITCHES.OFFBSR2.isSet = addr === 2
  SWITCHES.RDWRBSR2.isSet = addr === 3
  SWITCHES.READBSR1.isSet = addr === 8
  SWITCHES.WRITEBSR1.isSet = addr === 9
  SWITCHES.OFFBSR1.isSet = addr === 0x0A
  SWITCHES.RDWRBSR1.isSet = addr === 0x0B
  // Set soft switches for reading the bank-switched RAM status
  SWITCHES.BSRBANK2.isSet = (addr <= 3)
  SWITCHES.BSRREADRAM.isSet = [0, 3, 8, 0x0B].includes(addr)
}

export const SWITCHES = {
  STORE80: NewSwitch(0xC000, 0xC001, 0xC018, true),
  RAMRD: NewSwitch(0xC002, 0xC003, 0xC013, true),
  RAMWRT: NewSwitch(0xC004, 0xC005, 0xC014, true),
  INTCXROM: NewSwitch(0xC006, 0xC007, 0xC015, true),
  INTC8ROM: NewSwitch(0xC02A, 0, 0),  // Fake soft switch; add here so it is saved/restored
  ALTZP: NewSwitch(0xC008, 0xC009, 0xC016, true),
  SLOTC3ROM: NewSwitch(0xC00A, 0xC00B, 0xC017, true),
  COLUMN80: NewSwitch(0xC00C, 0xC00D, 0xC01F, true),
  ALTCHARSET: NewSwitch(0xC00E, 0xC00F, 0xC01E, true),
  KBRDSTROBE: NewSwitch(0xC010, 0, 0, false, () => {
    const keyvalue = memGetC000(0xC000) & 0b01111111
    memSetC000(0xC000, keyvalue, 32)
  }),
  BSRBANK2: NewSwitch(0, 0, 0xC011),    // status location, not a switch
  BSRREADRAM: NewSwitch(0, 0, 0xC012),  // status location, not a switch
  CASSOUT: NewSwitch(0xC020, 0, 0),  // random value filled in checkSoftSwitches
  SPEAKER: NewSwitch(0xC030, 0, 0, false, (addr, cycleCount) => {
    memSetC000(0xC030, rand())
    passClickSpeaker(cycleCount)
  }),
  GCSTROBE: NewSwitch(0xC040, 0, 0),    // strobe output to game connector
  EMUBYTE: NewSwitch(0, 0, 0xC04F, false, () => {memSetC000(0xC04F, 0xCD)}),
  TEXT: NewSwitch(0xC050, 0xC051, 0xC01A),
  MIXED: NewSwitch(0xC052, 0xC053, 0xC01B),
  PAGE2: NewSwitch(0xC054, 0xC055, 0xC01C),
  HIRES: NewSwitch(0xC056, 0xC057, 0xC01D),
  AN0: NewSwitch(0xC058, 0xC059, 0),  // random value filled in checkSoftSwitches
  AN1: NewSwitch(0xC05A, 0xC05B, 0),  // random value filled in checkSoftSwitches
  AN2: NewSwitch(0xC05C, 0xC05D, 0),  // random value filled in checkSoftSwitches
  AN3: NewSwitch(0xC05E, 0xC05F, 0),  // random value filled in checkSoftSwitches
  CASSIN1: NewSwitch(0, 0, 0xC060, false, () => {memSetC000(0xC060, rand())}),
  PB0: NewSwitch(0, 0, 0xC061),  // status location, not a switch
  PB1: NewSwitch(0, 0, 0xC062),  // status location, not a switch
  PB2: NewSwitch(0, 0, 0xC063),  // status location, not a switch
  JOYSTICK0: NewSwitch(0, 0, 0xC064, false,
    (addr, cycleCount) => {checkJoystickValues(cycleCount)}),
  JOYSTICK1: NewSwitch(0, 0, 0xC065, false,
      (addr, cycleCount) => {checkJoystickValues(cycleCount)}),
  JOYSTICK2: NewSwitch(0, 0, 0xC066, false,
    (addr, cycleCount) => {checkJoystickValues(cycleCount)}),
  JOYSTICK3: NewSwitch(0, 0, 0xC067, false,
    (addr, cycleCount) => {checkJoystickValues(cycleCount)}),
  CASSIN2: NewSwitch(0, 0, 0xC068, false, () => {memSetC000(0xC068, rand())}),
  FASTCHIP_LOCK: NewSwitch(0xC06A, 0, 0),   // used by Total Replay
  FASTCHIP_ENABLE: NewSwitch(0xC06B, 0, 0), // used by Total Replay
  FASTCHIP_SPEED: NewSwitch(0xC06D, 0, 0),  // used by Total Replay
  JOYSTICKRESET: NewSwitch(0, 0, 0xC070, false, (addr, cycleCount) => {
    resetJoystick(cycleCount)
    memSetC000(0xC070, rand())
  }),
  BANKSEL: NewSwitch(0xC073, 0, 0),  // Applied Engineering RamWorks
  LASER128EX: NewSwitch(0xC074, 0, 0),  // used by Total Replay (ignored)
  READBSR2: NewSwitch(0xC080, 0, 0),
  WRITEBSR2: NewSwitch(0xC081, 0, 0),
  OFFBSR2: NewSwitch(0xC082, 0, 0),
  RDWRBSR2: NewSwitch(0xC083, 0, 0),
  READBSR1: NewSwitch(0xC088, 0, 0),
  WRITEBSR1: NewSwitch(0xC089, 0, 0),
  OFFBSR1: NewSwitch(0xC08A, 0, 0),
  RDWRBSR1: NewSwitch(0xC08B, 0, 0),
}

SWITCHES.TEXT.isSet = true

const SoftSwitchDescriptions: Array<string> = []

export const getSoftSwitchDescriptions = () => {
  if (SoftSwitchDescriptions.length === 0) {
    for (const key in SWITCHES) {
      const sswitch = SWITCHES[key as keyof typeof SWITCHES]
      const isSwitch = sswitch.onAddr > 0
      const writeOnly = sswitch.writeOnly ? " (write)" : ""
      if (sswitch.offAddr > 0) {
        const addr = toHex(sswitch.offAddr) + ' ' + key
        SoftSwitchDescriptions[sswitch.offAddr] = addr + (isSwitch ? "-OFF" : "") + writeOnly
      }
      if (sswitch.onAddr > 0) {
        const addr = toHex(sswitch.onAddr) + ' ' + key
          SoftSwitchDescriptions[sswitch.onAddr] = addr + "-ON" + writeOnly
      }
      if (sswitch.isSetAddr > 0) {
        const addr = toHex(sswitch.isSetAddr) + ' ' + key
        SoftSwitchDescriptions[sswitch.isSetAddr] = addr + "-STATUS" + writeOnly
      }
    }
  }
  SoftSwitchDescriptions[0xC000] = 'C000 KBRD/80STORE-OFF'
  return SoftSwitchDescriptions
}

const skipDebugFlags = [0xC000, 0xC001, 0xC00D, 0xC00F, 0xC030, 0xC054, 0xC055, 0xC01F]

export const checkSoftSwitches = (addr: number,
  calledFromMemSet: boolean, cycleCount: number) => {
  if (addr > 0xFFFFF && !skipDebugFlags.includes(addr)) {
    const s = memGetC000(addr) > 0x80 ? 1 : 0
    console.log(`${cycleCount} $${toHex(s6502.PC)}: $${toHex(addr)} [${s}] ${calledFromMemSet ? "write" : ""}`)
  }
  // Handle banked-RAM soft switches, since these have duplicate addresses
  // and need to call our special function.
  if (addr >= 0xC080 && addr <= 0xC08F) {
    // $C084...87 --> $C080...83, $C08C...8F --> $C088...8B
    addr -= addr & 4
    handleBankedRAM(addr)
    return
  }
  if (addr === 0xC000 && !calledFromMemSet) {
    popKey()
    return
  }
  const sswitch1 = sswitchArray[addr - 0xC000]
  if (!sswitch1) {
    console.error("Unknown softswitch " + toHex(addr))
    memSetC000(addr, rand())
    return
  }
  if (sswitch1.setFunc) {
    sswitch1.setFunc(addr, cycleCount)
    return
  }
  if (addr === sswitch1.offAddr || addr === sswitch1.onAddr) {
    if (!sswitch1.writeOnly || calledFromMemSet) {
      // If we have overridden this switch, don't actually set the real
      // switch value - instead just change our cached value so it gets restored
      // to its new state when the Memory Dump panel is changed to a non-HGR bank.
      if (overriddenSwitches[sswitch1.offAddr - 0xC000] !== undefined) {
        overriddenSwitches[sswitch1.offAddr - 0xC000] = (addr === sswitch1.onAddr)
      } else {
        sswitch1.isSet = (addr === sswitch1.onAddr)
      }
    }
    if (sswitch1.isSetAddr) {
      memSetC000(sswitch1.isSetAddr, sswitch1.isSet ? 0x8D : 0x0D)
    }
    // Many games expect random "noise" from these soft switches.
    if (addr >= 0xC020) memSetC000(addr, rand())
  } else if (addr === sswitch1.isSetAddr) {
    memSetC000(addr, sswitch1.isSet ? 0x8D : 0x0D)
  }
}

export const resetSoftSwitches = () => {
  for (const key in SWITCHES) {
    const keyTyped = key as keyof typeof SWITCHES
    // If we have overridden this switch, don't actually set the real
    // switch value - instead just change our cached value so it gets restored
    // to its new state when the Memory Dump panel is changed to a non-HGR bank.
    if (overriddenSwitches[SWITCHES[keyTyped].offAddr - 0xC000] !== undefined) {
      overriddenSwitches[SWITCHES[keyTyped].offAddr - 0xC000] = false
    } else {
      SWITCHES[keyTyped].isSet = false
    }
  }
  if (overriddenSwitches[SWITCHES.TEXT.offAddr - 0xC000] !== undefined) {
    overriddenSwitches[SWITCHES.TEXT.offAddr - 0xC000] = true
  } else {
    SWITCHES.TEXT.isSet = true
  }
}

// An array of the original state of the soft switches, indexed by offAddress - 0xC000.
// This is needed for the Memory Dump panel, when displaying HGR page 1/2.
// These switches will get set back to their original values (and the array will be cleared)
// when the Memory Dump panel is set to a non-HGR memory bank.
const overriddenSwitches: Array<boolean> = []

export const overrideSoftSwitch = (addr: number) => {
  const sswitch1 = sswitchArray[addr - 0xC000]
  if (!sswitch1) {
    console.error("overrideSoftSwitch: Unknown softswitch " + toHex(addr))
    return
  }
  // If we have already cached this switch, don't override it again.
  // Otherwise we will never get back to our original state.
  // That can happen in the Memory Dump panel if the user chooses HGR page 1,
  // then HGR page 2.
  if (overriddenSwitches[sswitch1.offAddr - 0xC000] === undefined) {
    overriddenSwitches[sswitch1.offAddr - 0xC000] = sswitch1.isSet
  }
  sswitch1.isSet = (addr === sswitch1.onAddr)
}

export const restoreSoftSwitches = () => {
  overriddenSwitches.forEach((isSet, index) => {
    if (isSet !== undefined) {
      sswitchArray[index].isSet = isSet
    }
  })
  overriddenSwitches.length = 0
}
