import { InjectionToken } from "@angular/core";

export let TOASTR_TOKEN = new InjectionToken<IToastr>("toastr");

export interface IToastr {
  success(message: string, title?: string);
  info(message: string, title?: string);
  warning(message: string, title?: string);
  error(message: string, title?: string);
}