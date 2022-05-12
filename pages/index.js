import Image from "next/image"
import HeadApp from "../components/Head/HeadApp"
import Button from '@mui/material/Button'
import Layout from "../template/Layout"

const logo = require('../assets/icons/logo.png')

export default function Home() {
  return (
    <Layout head='Accueil'>
      <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <Image src={logo} width="369" height="167" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit distinctio, sequi adipisci optio dolorum amet sunt? Blanditiis, error illo iusto suscipit quia, ad, magni similique rerum unde perspiciatis doloremque consequuntur.
        Dolore quas sapiente perferendis assumenda dolor. Quam adipisci expedita dignissimos, dolore quae molestiae eligendi laudantium quas atque quibusdam praesentium? Et ad unde molestiae ducimus aperiam earum culpa, ratione modi iusto?
        Tenetur vitae rem fugit veniam perferendis dicta fuga quidem labore ipsa obcaecati explicabo qui asperiores pariatur totam deserunt corporis voluptatum iure animi, facere praesentium eius ipsum laborum quae consectetur. Qui.
        Neque numquam reprehenderit corrupti praesentium consequatur. Ducimus eaque accusamus molestiae harum quae. Earum vero ab ratione odit porro, ipsum eum in reprehenderit dignissimos ad maxime! Officia consequatur dolore cupiditate officiis.
        Ullam beatae excepturi necessitatibus, ut pariatur saepe fugiat, aliquam alias non illum unde doloremque temporibus, tempora eaque eligendi similique facere dolorem sapiente voluptates quos omnis. Quae, repellat? Asperiores, alias eligendi.
        Harum fugit perspiciatis, temporibus nihil amet fuga ea quos alias quibusdam beatae animi nostrum ex necessitatibus assumenda sequi quod excepturi ab sed? Voluptatem ipsa iste earum nobis dignissimos aliquid fuga!
        Nulla, velit doloremque distinctio quidem eligendi quas iusto molestiae repellendus! Totam corrupti maxime in laboriosam minus culpa possimus neque laborum, aliquid magni ducimus id sit. Atque totam temporibus nihil sunt.
        Deleniti eveniet temporibus molestiae quas. Delectus magnam quod distinctio obcaecati ea dignissimos praesentium autem quos iste atque nulla aliquam necessitatibus maiores optio voluptatibus saepe quaerat vitae, molestias, cum architecto dolor?
        A quaerat, corporis placeat mollitia eos ipsam sapiente odio et accusantium, unde asperiores officia nam sed nostrum! Soluta repellendus vel adipisci hic labore eos ad quo inventore nobis, quam commodi!
        Temporibus quos dolorem at ex totam doloremque voluptates aperiam, minima officia commodi aliquid suscipit iste laborum ullam delectus odio. Consequatur dolorem totam aliquam, possimus animi veniam vitae cum similique saepe.
        Nisi, reiciendis deserunt unde culpa tempore fuga, itaque fugiat consequatur illo libero in odio. Provident assumenda quibusdam magnam rerum, dicta sint ratione magni distinctio praesentium commodi numquam ducimus, tempore voluptatem.
        Mollitia itaque ex asperiores in, eius beatae magni laudantium molestias inventore cum ullam doloremque, exercitationem quas porro aliquam. Minima quasi a non mollitia id beatae consectetur, facilis animi obcaecati dolorem!
        Minus doloremque modi unde neque sunt est laboriosam fuga inventore error deleniti, nisi ipsum facilis. Temporibus consequatur eos nam, molestiae, voluptas distinctio ipsum hic architecto repellat, vero molestias cupiditate quos!
        Magnam nisi officia obcaecati, at provident ratione velit dolore. Corporis quos voluptatibus consectetur, maxime molestias rerum corrupti veniam voluptate est. A ipsum provident pariatur iure voluptates error natus accusamus tenetur.
        Nisi, laudantium laboriosam quisquam molestias magnam dolorem nulla, commodi error, amet odit nam eveniet nobis. Minus voluptas temporibus, iusto laudantium commodi itaque doloribus, labore numquam, quia veritatis fugit odit necessitatibus?</p>
      </div>
    </Layout>
  )
}
