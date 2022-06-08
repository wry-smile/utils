class EnumImploment {
  constructor(object: Record<string, string | number>) {
    if (object && typeof object === 'object') {
      Object.keys(object).forEach((key) => {
        object[object[key]] = object[key] = key
      })
      return object
    }
    else {
      return {}
    }
  }
}

export function toEnum(object: Record<string, string | number>) {
  return new EnumImploment(object)
}
