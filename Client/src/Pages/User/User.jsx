
import InstituteBanner from '../../components/InstituteBanner';
import InstituteList from '../Admin/Admin';

export default function example() {

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <InstituteBanner />
            <InstituteList />

        </div>

    );
};

// src={API_URL + "/uploads/" + info.banner}
//src={API_URL +"/uploads/" + info.logo}