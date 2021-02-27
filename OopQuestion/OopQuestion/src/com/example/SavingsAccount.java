package com.example;

public class SavingsAccount extends Account {

    public SavingsAccount(int id, double balance){
        super(id, balance);
    }
    private double annualInterestRate;

    public double getMonthlyInterestRate() {
        return annualInterestRate / (12*100);
    }

    public double getMonthlyInterest() {
        return getBalance() * getMonthlyInterestRate();
    }
}
