import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {

  ledgers:Ledger[] = [
    {
      date: new Date(),
      description: 'Test',
      totalDebit: 100,
      totalCredit: 100,
      creditLedger:[
        {
          transactionId:'1',
          time:new Date(),
          to:'Test',
          narration:'Test',
          from:'Test',
          amount:100
        },
        {
          transactionId:'1',
          time:new Date(),
          to:'Test',
          narration:'Test',
          from:'Test',
          amount:200
        },
        {
          transactionId:'1',
          time:new Date(),
          to:'Test',
          narration:'Test',
          from:'Test',
          amount:300
        },
      ],
      debitLedger:[
        {
          transactionId:'1',
          time:new Date(),
          to:'Test',
          narration:'Test',
          from:'Test',
          amount:100
        }
      ]
    }
  ]
  displayedColumns: string[] = ['transactionId', 'time', 'to', 'narration','amount'];
  dataSource: any[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}

interface Ledger {
  date: Date;
  description: string;
  totalDebit: number;
  totalCredit: number;
  creditLedger:LedgerTransaction[];
  debitLedger:LedgerTransaction[];
}
interface LedgerTransaction {
  transactionId:string;
  time:Date;
  to:string;
  narration:string;
  from:string;
  amount:number;
}