import {createFeatureSelector} from '@ngrx/store'
import { RegularIncome } from '../../domain/income/models/regular-income.model'

export const selectRegularIncomes = createFeatureSelector<RegularIncome[]>('regularIncomes');
