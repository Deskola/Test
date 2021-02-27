package com.example;

public class CheckingAccount extends Account {
    private int overdraft;

    public CheckingAccount(int id, double balance) {
        super(id, balance);

    }

    public double getOverdraft() {
        return overdraft;
    }
}