import TitleMovie from "../components/UI/TitleMovie";
import { faqData } from "../assets/fakedata/FooterContent";

const Faq = () => {
  return (
    <section className="faq">
      <div className="container">
        <TitleMovie title="Câu hỏi thường gặp" isCentered={true} />
        <ol className="faq__list">
          {faqData.map((item, index) => (
            <li key={index} className="faq__item">
              {item.title}
              {item.nestedlist.title && <p className="faq__title">{item.nestedlist.title}</p>}
              <ul className="faq__subList">
                {item.nestedlist.nestedItem?.map((nestedItem, index) => (
                  <li className="faq__subItem" key={`nested_${index}`}>
                    {nestedItem}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
export default Faq;
