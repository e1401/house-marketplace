import { Link } from 'react-router-dom';
import RentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import SellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
    return (
        <div className='explore'>
            <header>
                <p className='pageHeader'>Explore</p>
            </header>
            <main>
                {/* Slider position */}
                <p className='exploreCategoryHeading'>Categories</p>
                <div className='exploreCategories'>
                    <Link to='/category/rent'>
                        <img
                            src={RentCategoryImage}
                            alt='Rent category'
                            className='exploreCategoryImg'
                        />
                        <p className='exploreCategoryName'>Places for Rent</p>
                    </Link>
                    <Link to='/category/sale'>
                        <img
                            src={SellCategoryImage}
                            alt='Sell category'
                            className='exploreCategoryImg'
                        />
                        <p className='exploreCategoryName'>Places for Sale</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Explore;
