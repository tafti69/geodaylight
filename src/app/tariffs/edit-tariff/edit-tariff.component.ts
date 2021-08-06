import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tariffs } from '../tariffs.model';
import { TariffService } from '../tariffs.service';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.scss'],
})
export class EditTariffComponent implements OnInit {
  tariffs: Tariffs;
  success = false;
  successMessage = '';

  constructor(
    private trfServ: TariffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let tariffId = +this.route.snapshot.params['id'];
    this.trfServ.getTariffById(tariffId).subscribe(
      (data: Tariffs) => {
        this.tariffs = data;
      },
      (err: any) => console.log(err)
    );
  }

  saveChanges(): void {
    this.trfServ
      .updateTariff(this.tariffs)
      .subscribe((err: any) => console.log(err));
    this.success = true;
    this.successMessage = 'Тарифф был успешно обновлен!';
    setTimeout(() => {
      this.router.navigate(['/tariffs']);
    }, 500);
  }
}
