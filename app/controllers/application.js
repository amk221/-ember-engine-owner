import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default class ApplicationController extends Controller {
  @inject('local-service') localService;
  @inject('common-service') commonService;
}
