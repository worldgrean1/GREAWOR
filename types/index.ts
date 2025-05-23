export interface Metric {
  label: string
  value: string
  unit?: string
}

export interface Specification {
  label: string
  value: string
}

export interface LinkedInCardProps {
  title?: string
  description?: string
  specifications?: Specification[]
  metrics?: Metric[]
  tags?: string[]
  ariaLabel?: string
}
