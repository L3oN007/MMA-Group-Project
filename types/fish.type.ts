export interface IFish {
  quantity: number
  id: number
  name: string
  origin: string
  gender: string
  dob: string
  length: number
  weight: number
  personalityTraits: string
  dailyFeedAmount: number
  lastHealthCheck: string
  isAvailableForSale: boolean
  price: number
  isConsigned: boolean
  isSold: boolean
  ownerId: any
  koiCertificates: any[]
  koiBreeds: IBreed[]
  koiFishImages: any[]
  koiDiaries: any[]
  owner: any
}

export interface IBreed {
  id: number
  name: string
  content: string
  imageUrl: any
  isDeleted: boolean
}