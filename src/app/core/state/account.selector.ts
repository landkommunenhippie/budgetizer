import {createFeatureSelector} from '@ngrx/store'
import { MonthlyAccountOverview } from '../models/states.model';

export const selectMonthlyAccountOverviews = createFeatureSelector<MonthlyAccountOverview[]>('monthlyAccountOverviews');
