import 'reflect-metadata';
import { Container } from '@Packages';

const mode = process.env.SCHEMA_PROFILE ?? 'default';
const modulePath = `./cli.${mode}.ioc.module`;

const { CliModule } = require(modulePath);

const container = new Container();
container.load(CliModule);

export { container };
