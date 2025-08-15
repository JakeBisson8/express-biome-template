import { type Environment, EnvironmentSchema } from './models/environment.model';
export const environment: Environment = EnvironmentSchema.parse(process.env);
