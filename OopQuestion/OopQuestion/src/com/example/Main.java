package com.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static List<Account> createAccountList(){
        Account savingsAccount1 = new SavingsAccount(1, 100.0);
        Account savingsAccount2 = new SavingsAccount(2, 100.0);
        Account savingsAccount3 = new SavingsAccount(3, 100.0);
        Account savingsAccount4 = new SavingsAccount(4, 100.0);
        Account savingsAccount5 = new SavingsAccount(5, 100.0);

        Account checkingAccount1 = new CheckingAccount(6, 100.0);
        Account checkingAccount2 = new CheckingAccount(7, 100.0);
        Account checkingAccount3 = new CheckingAccount(8, 100.0);
        Account checkingAccount4 = new CheckingAccount(9, 100.0);
        Account checkingAccount5 = new CheckingAccount(10, 100.0);

        List<Account> accountList = new ArrayList<>();
        accountList.add(savingsAccount1);
        accountList.add(savingsAccount2);
        accountList.add(savingsAccount3);
        accountList.add(savingsAccount4);
        accountList.add(savingsAccount5);

        accountList.add(checkingAccount1);
        accountList.add(checkingAccount2);
        accountList.add(checkingAccount3);
        accountList.add(checkingAccount4);
        accountList.add(checkingAccount5);

        return accountList;
    }

    public static void startProcess(List<Account> accountList){
        promptUserToEnterId();
        int id;

        Scanner scanner = new Scanner(System.in);
        id = scanner.nextInt();

        int index;
        Account account;
        boolean idValidity = isIdValid(id, accountList);
        if(idValidity){
            index = getAccountIndex(id, accountList);
            account = accountList.get(index);
            displayMenu();
            int menuChoice = scanner.nextInt();
            switch (menuChoice){
                case 1:
                    getBalance(account);
                    startProcess(accountList);
                    break;
                case 2:
                    System.out.println("How much are you withdrawing?");
                    double withdrawalAmount = scanner.nextInt();
                    account.withdraw(withdrawalAmount);
                    accountList.set(index, account);
                    startProcess(accountList);
                case 3:
                    System.out.println("How much are you depositing?");
                    double depositAmount = scanner.nextInt();
                    account.deposit(depositAmount);
                    accountList.set(index, account);
                    startProcess(accountList);
                case 4:
                    startProcess(accountList);
                default:
                    break;
            }
        } else {
            System.out.println("ID is invalid.\n");
            startProcess(accountList);
        }
    }

    public static void promptUserToEnterId(){
        System.out.println("Hello. Kindly enter your ID.");
    }

    public static boolean isIdValid(int id, List<Account> accountList){
        boolean idValidity = false;
        for (Account account : accountList) {
            if (account.getId() == id) {
                idValidity = true;
                break;
            }
        }
        return idValidity;
    }

    public static int getAccountIndex(int id, List<Account> accountList){
        int index = 0;
        for (Account account : accountList) {
            if (account.getId() == id) {
                break;
            }
            index++;
        }
        return index;
    }

    public static void displayMenu(){
        String menu = "Main menu\n1. Check The Balance\n2. Withdraw\n3. Deposit\n4. Exit\n";
        System.out.println(menu);
    }

    public static void getBalance(Account account){
        System.out.println("Your balance is "+account.getBalance()+"\n");
    }

    public static void main(String[] args) {
        List<Account> accountList = createAccountList();
        startProcess(accountList);
    }
}
