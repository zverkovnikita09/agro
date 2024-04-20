import {ApplicationModel} from "@entities/Application/model/application.model";

export interface SelectedApplicationState {
  selectedApplication: Partial<ApplicationModel>[];
}