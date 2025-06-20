import Layout from "@/components/Layout";
import BookForm from "@/components/BookForm";

const BookPage = () => {
  return (
    <Layout>
      <div
        className="pt-24 pb-16 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images3.alphacoders.com/652/652739.jpg')" }}
      >
        <div className="container-pearl flex justify-center items-center">
          <div className="max-w-[480px] w-full bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6 font-playfair">
              Book your visit
            </h2>
            <p className="text-center mb-8 text-muted-foreground">
              Choose your preferred service, date and time, then hit "Confirm". We'll get back to you within the hour.
            </p>
            
            <BookForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookPage;