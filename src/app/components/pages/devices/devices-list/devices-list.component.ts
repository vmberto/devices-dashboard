import { FormGroup, FormBuilder } from '@angular/forms';
import { ShareDataService, ClientsService } from 'src/app/services';
import { FilterCriteria } from 'src/app/utils/crud/filter-criteria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from 'src/app/utils/crud/list-components.utils';
import { collapse } from 'src/app/utils/animations/animations';
import { DevicesService } from 'src/app/services/entities/devices.service';

@Component({
  selector: 'app-test',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
  animations: [collapse]
})
export class DevicesListComponent extends ListComponent implements OnInit {

  public filterForm: FormGroup;
  public clearFiltersBtn: boolean;
  public currentListStatus: number;


  public tableHeaders = [
    { title: 'Dispositivo', value: 'device', sortable: false },
    { title: 'Cliente', value: 'client', sortable: false },
    { title: 'Ambiente', value: 'environment', sortable: false },
    { title: 'Criado', value: 'created_at', sortable: false }
  ];

  constructor(private devicesService: DevicesService,
    private shareData: ShareDataService,
    private router: Router,
    private fb: FormBuilder) {
    super();

    this.filterCriteria = new FilterCriteria();
    this.resource = this.devicesService;
    this.shareDataService = this.shareData;
  }

  ngOnInit() {

    this.filterForm = this.fb.group({
      search: [''],
      health_insurance: ['']
    });

    this.filterCriteria.addListParams();

    this.loadData();
  }

  public submitFilters() {

    const controls = this.filterForm.controls;
    let countFilters = 0;

    if (controls.health_insurance.value) {
      this.filterCriteria.addParam('health_insurance', this.filterForm.controls.health_insurance.value);
      countFilters += 1;
    } else {
      this.filterCriteria.removeParam('health_insurance');
    }

    if (controls.search.value) {
      this.filterCriteria.addParam('search', this.filterForm.controls.search.value);
      countFilters += 1;

    } else {
      this.filterCriteria.removeParam('search');
    }

    if (countFilters > 0) this.clearFiltersBtn = true;
    else this.clearFiltersBtn = false;

    this.loadData();

  }

  public clearFilters() {
    this.filterCriteria.clearParams();
    this.filterCriteria.addListParams();

    this.filterForm.reset();

    this.clearFiltersBtn = false;

    this.loadData();
  }


  /**
   * Direciona para a rota de detalhes do paciente
   * @param id (number)
   */
  public show(id: number) {
    this.router.navigate([`home/clients/show/${id}`]);
  }

  /**
   * Exclui um paciente
   * @param id (number)
   */
  public delete(id: number) {
    this.devicesService.delete(id).subscribe(
      () => {
        this.loadData();

      }
    );
  }

}
