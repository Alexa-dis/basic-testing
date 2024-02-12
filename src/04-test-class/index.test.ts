// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  beforeEach(() => {
    bankAccount = new BankAccount(100);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(100)).toEqual(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(1000);
    }).toThrow(new InsufficientFundsError(100));
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = new BankAccount(1000);
    expect(() => {
      bankAccount.transfer(1000, newBankAccount);
    }).toThrow(new InsufficientFundsError(100));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(1000, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    bankAccount.deposit(100);
    expect(bankAccount.getBalance()).toEqual(200);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(100);
    expect(bankAccount.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const newBankAccount = new BankAccount(100);
    newBankAccount.transfer(100, bankAccount);
    expect(newBankAccount.getBalance()).toEqual(0);
    expect(bankAccount.getBalance()).toEqual(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 1000;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    bankAccount.fetchBalance().then((data) => {
      expect(typeof data).toBe('number');
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 10;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
