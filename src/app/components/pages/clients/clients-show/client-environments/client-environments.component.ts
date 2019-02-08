import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from 'src/app/services/entities/enviroments.service';
import { collapse } from 'src/app/utils/animations/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorErrors } from 'src/app/utils/validators/errors.validators';
import { ShareDataService } from 'src/app/services';


@Component({
  selector: 'app-client-environments',
  templateUrl: './client-environments.component.html',
  styleUrls: ['./client-environments.component.css'],
  animations: [collapse]
})
export class ClientEnvironmentsComponent implements OnInit {

  public clientId: number;

  public createEnvironmentToggle: boolean;
  public creatingEnvironment: boolean;

  public environmentForm: FormGroup;

  public environments: any[];

  constructor(
    private shareDataService: ShareDataService,
    private environmentsService: EnvironmentsService,
    private fb: FormBuilder,
    private FormValidationErrors: FormValidatorErrors) { }

  ngOnInit() {

    this.clientId = this.shareDataService.client.id;

    this.environmentForm = this.fb.group({
      title: ['', [Validators.required]],
      update_time: ['', [Validators.required]]
    });

    this.environments = this.shareDataService.client.environments;


  }

  public submitEnvironment(): void {

    this.FormValidationErrors.getFormValidationErrors(this.environmentForm);

    if (this.environmentForm.valid) {

      this.creatingEnvironment = true;


      const formControls = this.environmentForm.controls;

      const environmentData = {
        title: formControls.title.value,
        clientId: this.clientId
      }

      this.environmentsService.post(environmentData)
        .subscribe(
          res => {
            this.environments.push(res.new_environment);
            this.environmentForm.reset();
            this.creatingEnvironment = false;
            this.createEnvironmentToggle = false;

          },
          err => {
            this.creatingEnvironment = false;
            console.log(err);

          }
        );


    };

  }

}
