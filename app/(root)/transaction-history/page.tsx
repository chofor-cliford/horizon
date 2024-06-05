import HeaderBox from "@/components/shared/HeaderBox";
import { Pagination } from "@/components/shared/Pagination";
import TransactionsTable from "@/components/shared/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";

const TransactionsHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });

  if (!accounts) return;
  const accountsData = accounts?.data?.[0];

  const appwriteItemId = (id as string) || accountsData?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

   const rowsPerPage = 10;
   const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
   const indexOfLastTransaction = currentPage * rowsPerPage;
   const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

   const currentTransactions = account?.transactions.slice(
     indexOfFirstTransaction,
     indexOfLastTransaction
   );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transactions History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {accountsData?.name}
            </h2>
            <p className="text-14 text-blue-25">{accountsData?.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●
              <span className="text-16">&nbsp;{accountsData?.mask}</span>
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(accountsData?.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />

          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination page={currentPage} totalPages={totalPages} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionsHistory;
