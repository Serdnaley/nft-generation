import { filterTypes, layerTypes } from '@/enums'
import { merge } from 'lodash'
import { traits } from '@/traits'

let lastId = 0

export class LayerOptions {
  constructor(payload = {}) {
    merge(this, payload)

    this.id ??= ++lastId
    this.layerType ??= layerTypes.BODY
    this.trait ??= traits.find(trait => trait.layerType === this.layerType)
    this.filters ??= []

    this.filters = this.filters.map((filter) => new FilterOptions(filter))
  }
}

export class FilterOptions {
  constructor(payload = {}) {
    merge(this, payload)

    this.id ??= ++lastId
    this.type ??= filterTypes.MIX
    this.color ??= '#000'
    this.amount ??= 0
    this.degree ??= 0
  }
}
