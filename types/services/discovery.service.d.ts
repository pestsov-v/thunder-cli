import { IAbstractDiscoveryService } from '@chaminjector/seeds-discovery-service';
import { IAbstractService } from './abstract.service';

export interface IDiscoveryService extends IAbstractService, IAbstractDiscoveryService {}
