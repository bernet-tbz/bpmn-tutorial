package ch.tbz.bpmn.backend;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Alle Methoden um Rechnungen zu Bearbeiten.
 */
@Path( "rechnung/" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class RechnungBackend
{
    /** 
     * Hilfsklasse um die einzelnen Prozessfelder als POJO umzuwandeln
     */
    @XmlRootElement
    public static class FormData
    {
        @XmlElement
        public String rnr;
        @XmlElement
        public String rdatum;
        @XmlElement
        public String rbetrag;
    }
    
    /**
     * Eigentliche Methode um die Rechnung zu zahlen
     * @param data Prozessfelder im JSON Format
     * @return HTTP 200 wenn o.k.
     */
    @POST
    @Path( "zahlen/" )
    public Response zahlen( FormData data )
    {
        System.err.println( "Rechnungs-Nr: " + data.rnr + ", Datum: " + data.rdatum + ", Betrag: " + data.rbetrag );
        return  ( Response.status(  200 ).build() );
    }

}
