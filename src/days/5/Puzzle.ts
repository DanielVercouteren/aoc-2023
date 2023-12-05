import Puzzle from '../../types/AbstractPuzzle'
import { Maps } from './types'

export default class ConcretePuzzle extends Puzzle {
  splitInput = (map: Maps): string[][] => {
    const inputLines = this.input.split('\n\n')

    return inputLines
      .find((line) => line.startsWith(map))
      .split('map:\n')[1]
      .split('\n')
      .map((line) => line.split(' '))
  }

  convert = (input: string[][], convertable: number): number => {
    const convertTable = input.find(
      (list) =>
        Number(list[1]) <= convertable &&
        Number(list[1]) + Number(list[2]) > convertable
    )

    if (convertTable) {
      return Number(convertTable[0]) - Number(convertTable[1]) + convertable
    } else {
      return convertable
    }
  }

  seedToSoil = (seed: number): number => {
    const input = this.splitInput(Maps.seedToSoil)
    const soil = this.convert(input, seed)
    return this.soilToFertilizer(soil)
  }

  soilToFertilizer = (soil: number): number => {
    const input = this.splitInput(Maps.soilToFertilizer)
    const fertilizer = this.convert(input, soil)
    return this.fertilizerToWater(fertilizer)
  }
  fertilizerToWater = (fertilizer: number): number => {
    const input = this.splitInput(Maps.fertilizerToWater)
    const water = this.convert(input, fertilizer)
    return this.waterToLight(water)
  }
  waterToLight = (water: number): number => {
    const input = this.splitInput(Maps.waterToLight)
    const light = this.convert(input, water)
    return this.lightToTemperature(light)
  }
  lightToTemperature = (light: number): number => {
    const input = this.splitInput(Maps.lightToTemperature)
    const temperature = this.convert(input, light)
    return this.temperatureToHumidity(temperature)
  }
  temperatureToHumidity = (temperature: number): number => {
    const input = this.splitInput(Maps.temperatureToHumidity)
    const humidity = this.convert(input, temperature)
    return this.humidityToLocation(humidity)
  }
  humidityToLocation = (humidity: number): number => {
    const input = this.splitInput(Maps.humidityToLocation)
    return this.convert(input, humidity)
  }

  public solveFirst(): string {
    const seeds = this.input.split('\n\n')[0].split('seeds: ')[1].split(' ')

    return seeds
      .reduce((acc, currentValue) => {
        return Math.min(this.seedToSoil(Number(currentValue)), acc)
      }, Infinity)
      .toString()
  }

  public getFirstExpectedResult(): string {
    return '35'
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2'
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2'
  }
}
