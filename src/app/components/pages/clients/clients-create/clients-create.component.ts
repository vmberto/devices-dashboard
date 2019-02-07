import { MARITAL_STATES } from 'src/app/utils/consts/config.utils';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { emailValidator, nameValidator } from 'src/app/utils/validators/validators';
import { FormValidatorErrors } from 'src/app/utils/validators/errors.validators';
import { SeekerService } from 'src/app/services';
import { fade } from 'src/app/utils/animations/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.css'],
  animations: [fade]
})
export class ClientsCreateComponent implements OnInit {

  public patientForm: FormGroup;
  public isPrivateValue: 'Sim' | 'Não' = 'Não';
  public healthInsurances;
  public maritalStates = MARITAL_STATES;

  public creatingPatient: boolean;
  public findingCep: boolean;
  public cepFound: boolean;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private seekerService: SeekerService,
    private FormValidationErrors: FormValidatorErrors) { }

  ngOnInit() {

    this.patientForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      
      phone: ['', [Validators.required]],

      zip_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
    });
  }

  public findCep(): void {

    if (this.patientForm.controls.zip_code.value.length === 8) {

      const formControls = this.patientForm.controls;
      this.findingCep = true;

      this.seekerService.getCep(formControls.zip_code.value)
        .subscribe(
          (res) => {
            this.findingCep = false;

            if (!res['erro']) {
              this.cepFound = true;
              formControls.city.setValue(res['localidade']);
              formControls.district.setValue(res['bairro']);
              formControls.street.setValue(res['logradouro']);

              formControls.zip_code.disable();
              let focusInput = 'address-city';

              if (res['localidade']) {
                formControls.city.disable();
                focusInput = 'address-district';
              }
              if (res['bairro']) {
                formControls.district.disable();
                focusInput = 'address-street';
              }
              if (res['logradouro']) {
                formControls.street.disable();
                focusInput = 'address-number';
              }

              document.getElementById(focusInput).focus();

            }

          },
          () => {
            this.findingCep = false;
          }
        );
    }

  }

  public clearSelectedAddress(): void {
    if (this.cepFound) {
      const formControls = this.patientForm.controls;

      formControls.zip_code.enable();
      formControls.city.enable();
      formControls.district.enable();
      formControls.street.enable();


      formControls.city.setValue('');
      formControls.district.setValue('');
      formControls.street.setValue('');
      formControls.zip_code.setValue('');

      this.cepFound = false;
    }
  }



  submitPatientData(): void {
    this.FormValidationErrors.getFormValidationErrors(this.patientForm);
    
    if (this.patientForm.valid) {
      
      this.creatingPatient = true;


      const formControls = this.patientForm.controls;

      const patientData = {
        name: formControls.name.value,
        phone: formControls.phone.value,
        address: {
          street: formControls.street.value,
          number: formControls.number.value,
          complement: formControls.complement.value,
          zipCode: formControls.zip_code.value,
          district: formControls.district.value,
          city: formControls.city.value,
        }
      };

      this.clientsService.post(patientData)
        .subscribe(
          () => {
            this.creatingPatient = false;

            this.router.navigate(['..'], { relativeTo: this.route });
          },
          () => {
            this.creatingPatient = false;

          }
        );
    }


  }

}
