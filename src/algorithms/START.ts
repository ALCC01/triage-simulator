import { Code, TriageAlgorithm } from '.'
import { randomInt, randomBool, randomFloat, codeToEmoji } from '../utils'

export interface StartPatient {
  id: number
  adult: boolean
  code: Code
  assignedCode?: Code
  bleeding: boolean
  bleedingControlled?: boolean
  walking?: boolean
  breathing?: boolean
  airwayObstruction: boolean
  airwayCleared?: boolean
  respiratoryRate?: number
  capillaryRefill?: number
  obeys?: boolean
}

export enum StartAction {
  CONTROL_BLEEDING,
  CLEAR_AIRWAY,
  CHECK_RESPIRATORY_RATE,
  CHECK_CAPILLARY_REFILL,
  CHECK_MENTAL_STATUS,
  CHECK_WALKING
}

class Start extends TriageAlgorithm<StartPatient, StartAction> {
  newPatient (code: Code, id?: number): StartPatient {
    const adult = randomBool(0.6)
    const airwayObstruction = code === Code.IMMEDIATE ? randomBool(0.3) : false
    const bleeding = randomBool(0.3)
    const bleedingControlled = false

    return { id: id ?? randomInt(0, 500), adult, code, airwayObstruction, bleeding, bleedingControlled }
  }

  action (action: StartAction, p: StartPatient): Partial<StartPatient> {
    switch (action) {
      case StartAction.CONTROL_BLEEDING:
        return this.controlBleeding()
      case StartAction.CLEAR_AIRWAY:
        return this.clearAirway()
      case StartAction.CHECK_RESPIRATORY_RATE:
        return this.checkRespiratoryRate(p)
      case StartAction.CHECK_CAPILLARY_REFILL:
        return this.checkCapillaryRefill(p)
      case StartAction.CHECK_MENTAL_STATUS:
        return this.checkMentalStatus(p)
      case StartAction.CHECK_WALKING:
        return this.checkWalking(p)
    }
  }

  private controlBleeding (): Partial<StartPatient> {
    return { bleedingControlled: true }
  }

  private clearAirway (): Partial<StartPatient> {
    return { airwayCleared: true }
  }

  private checkRespiratoryRate ({ code, airwayObstruction, airwayCleared }: StartPatient): Partial<StartPatient> {
    const obstructed = airwayObstruction && airwayCleared !== true

    let respiratoryRate = 0 // Default value for expectant patients
    if (code < Code.IMMEDIATE) respiratoryRate = randomInt(5, 30)
    if (code === Code.IMMEDIATE) respiratoryRate = obstructed ? 0 : randomInt(10, 45)

    return { respiratoryRate }
  }

  private checkCapillaryRefill ({ code }: StartPatient): Partial<StartPatient> {
    let capillaryRefill = 0
    if (code === Code.EXPECTANT) capillaryRefill = randomFloat(2, 10)
    else if (code === Code.IMMEDIATE) capillaryRefill = randomFloat(0, 4)
    else capillaryRefill = randomFloat(0, 2)

    return { capillaryRefill }
  }

  private checkMentalStatus ({ code }: StartPatient): Partial<StartPatient> {
    const obeys = code < Code.IMMEDIATE

    return { obeys }
  }

  private checkWalking ({ code }: StartPatient): Partial<StartPatient> {
    const walking = code <= Code.MINOR
    return { walking }
  }

  getFeedback (p: StartPatient): string[] {
    const feedback = []

    if (p.assignedCode === undefined) feedback.push('❓ You did not assign a code to this patient')
    else if (p.assignedCode !== p.code) {
      feedback.push(`❌ The correct code was ${codeToEmoji(p.code)}, you assigned ${codeToEmoji(p.assignedCode)}`)
    } else feedback.push(`🎉 The correct code was ${codeToEmoji(p.code)}!`)

    if (p.bleeding) {
      if (p.bleedingControlled === true) feedback.push('✅ Bleeding was controlled')
      else feedback.push('❌ Bleeding wasn\'t controlled')
    } else if (p.bleedingControlled === true) feedback.push('❌ Bleeding control wasn\'t needed')

    if (p.airwayObstruction || p.code === Code.EXPECTANT) {
      if (p.airwayCleared === true) feedback.push('✅ Airway was cleared')
      else if (p.respiratoryRate !== undefined) feedback.push('❌ Airway wasn\'t cleared') // Wait until respiratory rate is checked
    } else if (p.airwayCleared === true) feedback.push('❌ Airway wasn\'t needed')

    if (p.code === Code.MINOR && (p.respiratoryRate !== undefined || p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push('❌ You didn\'t need to proceed beyond checking mobility')
    } else if (p.respiratoryRate !== undefined && (p.respiratoryRate === 0 || p.respiratoryRate > 30 || p.airwayObstruction) && (p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push('❌ You didn\'t need to proceed beyond checking the respiratory rate')
    } else if (p.capillaryRefill !== undefined && p.capillaryRefill >= 2 && p.obeys !== undefined) {
      feedback.push('❌ You didn\'t need to proceed beyond checking the capillary refill')
    }

    return feedback
  }
}

export const START = new Start()
