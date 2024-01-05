import {IAbstractService} from "./abstract.service";
import {IAbstractDiscoveryService} from "@chaminjector/seeds-discovery-service";

export interface IDiscoveryService extends IAbstractService, IAbstractDiscoveryService {}