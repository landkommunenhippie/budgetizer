import {createFeatureSelector} from '@ngrx/store'
import { RegularIncome } from '../models/regular-income.model'

export const selectRegularIncomes = createFeatureSelector<RegularIncome[]>('regularIncomes');
