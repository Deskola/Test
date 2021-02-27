package com.example;

import java.util.Date;

public class Account {
    private int id;
    private double balance;
    private Date dateCreated;

    public Account(){

    }

    public Account(int id, double balance){
        this.id = id;
        this.balance = balance;
    }

    public int getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount){
        balance = balance - amount;
    }

    public void deposit(double amount){
        balance = balance + amount;
    }
}
