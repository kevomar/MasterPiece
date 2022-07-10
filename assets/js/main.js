const basic_salary = document.querySelector('#salary'),
benefits  = document.querySelector('#benefits'),
period = document.getElementsByName('period'),
nssf = document.getElementsByName('pension'),
rates = document.getElementsByName('rates'),
nhif = document.getElementsByName('insuarance'),
gross_salary = document.querySelector('#gross-salary'),
deductable_nssf = document.querySelector('#nssf'),
remaining_income = document.querySelector('#remaining-income'),
benefits_in_kind = document.querySelector('#benefits-in-kind'),
taxable_income = document.querySelector('#taxable-income'),
tax_payable = document.querySelector('#tax'),
relief = document.querySelector('#personal-relief'),
net_tax = document.querySelector('#net-tax'),
PAYE = document.querySelector('#PAYE'),
chargable_income = document.querySelector('#chargeable-income'),
nhif_contribution = document.querySelector('#nhif-contribution'),
net_pay  = document.querySelector('#net-pay')

calculate_pension = (basic_salary) => {
    let pension_max = 18000,
    pension;
    
    //check if nssf is clicked
    if(nssf[0].checked){
        //check if rates are new or old
        if(rates[0].checked){
            if(basic_salary > pension_max){
                pension = 1080;
            } else{
                pension = basic_salary * 0.06;
            }
        } else{
            pension = 200;
        }
    } else{
        pension = 0;
    }
    if(period[0].checked){
        return pension
    } else{
        return pension * 12
    }
}

calculate_paye = () => {
    if(period[0].checked){
        gross_salary.innerHTML = basic_salary.value
        deductable_nssf.innerHTML = `ksh ${Math.round(calculate_pension(basic_salary.value))}` 
        remaining_income.innerHTML = `ksh ${Math.round(basic_salary.value - calculate_pension(basic_salary.value))}`
        benefits_in_kind.innerHTML = `ksh ${Math.round(benefits.value)}`
        taxable_income.innerHTML = `ksh ${Math.round(calculate_taxable_income())}`
        tax_payable.innerHTML = `ksh ${Math.round(calculate_tax())}`
        relief.innerHTML = `ksh ${Math.round(calculate_relief())}`
        net_tax.innerHTML = `ksh ${Math.round(calculate_net_tax())}`
        PAYE.innerHTML = `ksh ${Math.round(calculate_net_tax())}`
        chargable_income.innerHTML = `ksh ${Math.round(calculate_taxable_income())}`
        nhif_contribution.innerHTML = `ksh ${Math.round(calculate_nhif(basic_salary.value))}`
        net_pay.innerHTML = `ksh ${Math.round(calculate_net_pay())}`
    } else{
        gross_salary.innerHTML = basic_salary.value
        deductable_nssf.innerHTML = `ksh ${Math.round(calculate_pension(basic_salary.value))}`
        remaining_income.innerHTML = `ksh ${Math.round(basic_salary.value - calculate_pension(basic_salary.value))}`
        benefits_in_kind.innerHTML = `ksh ${Math.round(benefits.value)}`
        taxable_income.innerHTML = `ksh ${Math.round(calculate_taxable_income())}`
        tax_payable.innerHTML = `ksh ${Math.round(calculate_tax())}`
        relief.innerHTML = `ksh ${Math.round(calculate_relief())}`
        net_tax.innerHTML = `ksh ${Math.round(calculate_net_tax())}`
        PAYE.innerHTML = `ksh ${Math.round(calculate_net_tax()) }`
        chargable_income.innerHTML = `ksh ${Math.round(calculate_taxable_income())}`
        nhif_contribution.innerHTML = `ksh ${Math.round(calculate_nhif(basic_salary.value))}`
        net_pay.innerHTML = `ksh ${Math.round(calculate_net_pay())}`
    }
}

calculate_taxable_income = () => {
    let benefits_value, basic_salary_value
    if(period[0].checked){
        benefits_value = parseInt(benefits.value)
        //convert basic_salary.value to number
        basic_salary_value = parseInt(basic_salary.value)
    } else{
        benefits_value = parseInt(benefits.value)/12
        //convert basic_salary.value to number
        basic_salary_value = parseInt(basic_salary.value) /12
    }
    //convert benefits.value to number

    
    if(period[0].checked){
        return  basic_salary_value + benefits_value - calculate_pension(basic_salary.value)
    } else{
        console.log(basic_salary_value , benefits_value , calculate_pension(basic_salary.value))
        return (basic_salary_value*12 + benefits_value*12 - calculate_pension(basic_salary.value))
    }
}

calculate_tax = () => {
    let ti
    if(period[0].checked){
        ti = calculate_taxable_income()
    } else{
        ti = calculate_taxable_income() / 12
    }
    let tax = 0
    if(ti > 0 && ti <= 12298){
        tax = 0.1 * ti
    } else if(ti > 12298 && ti <= 23885) {
        tax = 1229.8 + 0.15 * (ti - 12298)
    }else if(ti > 23885 && ti <= 35472){
        tax = 1229.8 + 1738.05 + 0.2 * (ti - 23885)
    }else if(ti > 35472 && ti <= 47059){
        tax = 1229.8 + 1738.05 + 2317.2 + 0.25 * (ti - 35472)
    }else if(ti > 47059){
        tax = 1229.8 + 1738.05 + 2317.2 + 2896.75 + 0.3 * (ti - 47059)
    }else{
        tax = 0;
    }
    if(period[0].checked){
        return tax
    } else{
        return tax * 12
    }
}

calculate_relief = () => {
    //check if period.value = month or year
    if(period[0].checked){
        relief.value = 2400
    } else{
        relief.value = 28800
    }
    return relief.value
}

calculate_nhif = (basic_salary) => {
    if(period[0].checked){
        basic_salary = basic_salary/12
    }
      let amount = 0
    if(basic_salary > 0 && basic_salary <= 5999){
        amount = 150
    } else if (basic_salary > 5999 && basic_salary <= 7999){
        amount = 300
    } else if (basic_salary > 7999 && basic_salary <= 11999){
        amount = 400
    } else if (basic_salary > 11999 && basic_salary <= 14999){
        amount = 500
    } else if(basic_salary > 14999 && basic_salary <= 19999){
        amount = 600
    } else if(basic_salary > 19999 && basic_salary <= 24999){
        amount = 750
    } else if(basic_salary > 24999 && basic_salary <= 29999){
        amount = 850
    } else if(basic_salary > 29999 && basic_salary <= 34999){
        amount = 900
    } else if(basic_salary > 34999 && basic_salary <= 39999){
        amount = 950
    } else if(basic_salary > 39999 && basic_salary <= 44999){
        amount = 1000
    } else if(basic_salary > 44999 && basic_salary <= 49999){
        amount = 1100
    } else if(basic_salary > 49999 && basic_salary <= 59999){
        amount = 1200
    } else if(basic_salary > 59999 && basic_salary <= 69999){
        amount = 1300
    } else if(basic_salary > 69999 && basic_salary <= 79999){
        amount = 1400
    } else if(basic_salary > 79999 && basic_salary <= 89999){
        amount = 1500
    } else if(basic_salary > 89999 && basic_salary <= 99999){
        amount = 1600
    } else if(basic_salary > 99999 ){
        amount = 1700
    } else {
        amount = -1
    }
    if(period[0].checked){
        return amount
    } else{
        return amount * 12
    }
}

calculate_net_tax = () => {
    let tax = calculate_tax()
    let relief = calculate_relief()
    let nt = tax - relief
    if(nt > 0) return nt
    else return 0
}

calculate_net_pay = () => {
    return calculate_taxable_income() - calculate_tax() + calculate_relief() - calculate_nhif(basic_salary.value)
}