import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStart, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);


    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        //асинхронна заявка
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`
            
            const response = await fetch(baseUrl);
            // проверяваме дали респонса е със статус ок, ако не е хвърляме грешка, която ще хванем
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            //при ок респонс асинхронно го парсваме към Json
            const responseJson = await response.json();
            
            const loadedBook: BookModel = {
                id: responseJson.id,
                    title: responseJson.title,
                    author: responseJson.author,
                    description: responseJson.description,
                    copies: responseJson.copies,
                    copiesAvailable: responseJson.copiesAvailable,
                    img: responseJson.img,
            };
            // useState го сетваме книгата
            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message); 
        })
    }, []);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok){
                throw new Error('Something went wrong!')
            }

            const responseJsonReview = await responseReviews.json();

            const responseData = responseJsonReview._embedded.reviews;
            
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;

            for(const key in responseData){
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                })
                //калкулираме броя на всички звезди
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }
            if(loadedReviews){
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round))
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })


    }, [])

    if(isLoading || isLoadingReview) {
        return (
            <SpinnerLoading/>
        )
    }
    if(httpError){
        return (
            <div className="container m-t">
                <p>{httpError}</p>
            </div>
        )
    }

    return(
        <div>
        <div className='container d-none d-lg-block'>
            <div className='row mt-5'>
                <div className='col-sm-2 col-md-2'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className='col-4 col-md-4 container'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStart} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={false}/>
            </div>
            <hr />
            <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
        </div>
        <div className='container d-lg-none mt-5'>
            <div className='d-flex justify-content-center align-items-center'>
                {book?.img ?
                    <img src={book?.img} width='226' height='349' alt='Book' />
                    :
                    <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                        height='349' alt='Book' />
                }
            </div>
            <div className='mt-4'>
                <div className='ml-2'>
                    <h2>{book?.title}</h2>
                    <h5 className='text-primary'>{book?.author}</h5>
                    <p className='lead'>{book?.description}</p>
                    <StarsReview rating={totalStart} size={32} />
                </div>
            </div>
            <CheckoutAndReviewBox book={book} mobile={true}/>
            <hr />
            <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
        </div>
    </div>
    )
}