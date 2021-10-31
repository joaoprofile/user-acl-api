import express, { Application } from "express"

import 'dotenv/config'
import "reflect-metadata"

import cors from 'cors'
import 'express-async-errors'
import { errors } from 'celebrate'
import './infra/DI'

import { Route } from "./api/common/Route"
import { config } from './core/config/environment'
import { GlobalError } from './api/middlewares/GlobalError'

export class App {
  private application: Application

  constructor() {
    this.application = express()
  }

  private async bootstrap(routes: Route[]): Promise<void> {
    this.application.use(express.json())
    this.application.use(cors())

    this.application.get('/', (request, response) => {
      return response.status(200).json({
        service: 'Small ERP API',
        version: '1',
        resources: [
          `POST: ${config.SERVER.BASE_URL}/accounts/sign-up`,
          `POST: ${config.SERVER.BASE_URL}/auth/sign-in`,
          `POST: ${config.SERVER.BASE_URL}/auth/roles`,
        ]
      })
    })

    for (let route of routes) {
      route.applyRoutes(this.application)
    }

    // Get errors routes validation (celebrate)
    this.application.use(errors())

    // Get global errors
    this.application.use(GlobalError)
  }

  public routes(routes: Route[] = []): express.Application {
    this.bootstrap(routes)
    return this.application
  }
}