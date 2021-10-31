import { Router } from 'express'

export abstract class Route {
  abstract applyRoutes(route: Router): void
}