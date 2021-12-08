import {createFeatureSelector} from '@ngrx/store'
import { RegularSpending } from '../../domain/spending/models/regular-spending.model'

export const selectRegularSpendings = createFeatureSelector<RegularSpending[]>('regularSpendings');
