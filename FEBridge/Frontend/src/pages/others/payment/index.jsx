import Payment from "@/components/payment";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
    title: 'Payment || FindHouse - Real Estate React Template',
    description:
        'FindHouse - Real Estate React Template',
}

const PaymentPage = () => {
    return (
        <>
            <MetaComponent meta={metadata} />
            <Payment />
        </>
    );
};

export default PaymentPage
